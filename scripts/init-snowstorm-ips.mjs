import { readFile } from 'node:fs/promises';
import path from 'node:path';

const DEFAULT_BASE_URL = process.env.SNOWSTORM_BASE_URL || 'http://localhost:8082';
const DEFAULT_FILE = process.env.IPS_TERMINOLOGY_FILE
  || path.join(process.cwd(), 'infra', 'terminology', 'ips', 'IPS-Terminology.zip');
const DEFAULT_BRANCH = process.env.SNOWSTORM_IMPORT_BRANCH || 'MAIN';
const DEFAULT_CODE_SYSTEM_SHORT_NAME = process.env.SNOWSTORM_CODE_SYSTEM_SHORT_NAME || 'SNOMEDCT';
const DEFAULT_CODE_SYSTEM_NAME = process.env.SNOWSTORM_CODE_SYSTEM_NAME || 'IPS Terminology';
const DEFAULT_TIMEOUT_MS = Number.parseInt(process.env.SNOWSTORM_IMPORT_TIMEOUT_MS || '3600000', 10);
const DEFAULT_POLL_INTERVAL_MS = Number.parseInt(process.env.SNOWSTORM_IMPORT_POLL_INTERVAL_MS || '10000', 10);

function parseArgs(argv) {
  const options = {
    baseUrl: DEFAULT_BASE_URL,
    file: DEFAULT_FILE,
    branch: DEFAULT_BRANCH,
    codeSystemShortName: DEFAULT_CODE_SYSTEM_SHORT_NAME,
    codeSystemName: DEFAULT_CODE_SYSTEM_NAME,
    importType: 'SNAPSHOT',
    force: false,
    updateNameOnly: false,
    timeoutMs: DEFAULT_TIMEOUT_MS,
    pollIntervalMs: DEFAULT_POLL_INTERVAL_MS,
    help: false
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--help' || arg === '-h') {
      options.help = true;
    } else if (arg === '--force') {
      options.force = true;
    } else if (arg === '--update-name-only') {
      options.updateNameOnly = true;
    } else if (arg === '--base-url') {
      options.baseUrl = argv[++index];
    } else if (arg === '--file') {
      options.file = argv[++index];
    } else if (arg === '--branch') {
      options.branch = argv[++index];
    } else if (arg === '--code-system-short-name') {
      options.codeSystemShortName = argv[++index];
    } else if (arg === '--code-system-name') {
      options.codeSystemName = argv[++index];
    } else if (arg === '--timeout-ms') {
      options.timeoutMs = Number.parseInt(argv[++index], 10);
    } else if (arg === '--poll-interval-ms') {
      options.pollIntervalMs = Number.parseInt(argv[++index], 10);
    } else if (arg === '--import-type') {
      options.importType = String(argv[++index] || '').toUpperCase();
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return options;
}

function printHelp() {
  console.log(`
Initialize Snowstorm with the local IPS terminology snapshot.

Usage:
  npm run snowstorm:init:ips -- [options]

Options:
  --base-url <url>           Snowstorm specialist API base URL. Default: ${DEFAULT_BASE_URL}
  --file <path>              RF2 zip file to import. Default: ${DEFAULT_FILE}
  --branch <branch>          Target branch. Default: ${DEFAULT_BRANCH}
  --code-system-short-name   Code system short name to update. Default: ${DEFAULT_CODE_SYSTEM_SHORT_NAME}
  --code-system-name         Human-friendly code system name. Default: ${DEFAULT_CODE_SYSTEM_NAME}
  --import-type <type>       Import type. Default: SNAPSHOT
  --force                    Skip the non-empty Snowstorm safety check
  --update-name-only         Skip import and only update the code system name
  --timeout-ms <ms>          Max time to wait for import completion
  --poll-interval-ms <ms>    Polling interval while waiting for import completion
  --help                     Show this help
`.trim());
}

function normalizeBaseUrl(baseUrl) {
  return String(baseUrl || '').replace(/\/+$/, '');
}

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function parseResponse(response) {
  const text = await response.text();
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  const payload = await parseResponse(response);

  if (!response.ok) {
    const detail = typeof payload === 'string' ? payload : JSON.stringify(payload);
    throw new Error(`Request failed: ${response.status} ${response.statusText} for ${url}${detail ? `\n${detail}` : ''}`);
  }

  return {
    response,
    payload
  };
}

async function waitForSnowstorm(baseUrl) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < 180000) {
    try {
      await fetchJson(`${baseUrl}/version`);
      return;
    } catch {
      await sleep(3000);
    }
  }

  throw new Error(`Snowstorm did not become ready at ${baseUrl} within 180000ms.`);
}

function extractItems(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }
  if (Array.isArray(payload?.items)) {
    return payload.items;
  }
  return [];
}

function summarizeCodeSystem(item) {
  return {
    shortName: item?.shortName ?? null,
    branchPath: item?.branchPath ?? null,
    latestVersion: item?.latestVersion ?? null,
    latestVersionEffectiveTime: item?.latestVersionEffectiveTime ?? null,
    defaultModuleId: item?.defaultModuleId ?? null,
    owner: item?.owner ?? null,
    countryCode: item?.countryCode ?? null,
    languages: Array.isArray(item?.languages) ? item.languages : [],
    modules: Array.isArray(item?.modules) ? item.modules : []
  };
}

async function logCodeSystems(baseUrl, label) {
  try {
    const { payload } = await fetchJson(`${baseUrl}/codesystems`);
    const items = extractItems(payload);

    console.log(`${label} (${items.length}):`);
    if (items.length === 0) {
      console.log('[]');
      return;
    }

    console.log(JSON.stringify(items.map(summarizeCodeSystem), null, 2));
  } catch (error) {
    console.warn(`Could not fetch code systems for "${label}".\n${error.message}`);
  }
}

async function assertSnowstormLooksEmpty(baseUrl) {
  try {
    const { payload } = await fetchJson(`${baseUrl}/codesystems`);
    const items = extractItems(payload);
    const meaningfulItems = items.filter((item) => !isDefaultRootPlaceholder(item));
    if (meaningfulItems.length > 0) {
      const names = meaningfulItems
        .map((item) => item.shortName || item.name || item.branchPath)
        .filter(Boolean)
        .join(', ');
      throw new Error(
        `Snowstorm already has code systems loaded (${names || `${meaningfulItems.length} entries`}). ` +
        'This IPS initializer assumes an empty Snowstorm instance. Re-run with --force only if you really want to import anyway.'
      );
    }

    if (items.length > 0) {
      const names = items
        .map((item) => item.shortName || item.name || item.branchPath)
        .filter(Boolean)
        .join(', ');
      console.log(
        `Detected only the default Snowstorm root code system (${names || 'SNOMEDCT'}). ` +
        'It looks like a placeholder on MAIN, so the IPS import can proceed.'
      );
    }
  } catch (error) {
    if (String(error.message || '').includes('already has code systems loaded')) {
      throw error;
    }

    console.warn(`Warning: could not confirm whether Snowstorm is empty. Continuing anyway.\n${error.message}`);
  }
}

function isDefaultRootPlaceholder(item) {
  const shortName = String(item?.shortName || item?.name || '').toUpperCase();
  const branchPath = String(item?.branchPath || '').toUpperCase();

  if (shortName !== 'SNOMEDCT' || branchPath !== 'MAIN') {
    return false;
  }

  const possibleVersionSignals = [
    item?.latestVersion,
    item?.latestVersionEffectiveTime,
    item?.defaultModuleId,
    item?.owner,
    item?.countryCode
  ];

  const hasVersionSignal = possibleVersionSignals.some((value) => {
    if (value === null || value === undefined) {
      return false;
    }

    if (typeof value === 'string') {
      return value.trim().length > 0;
    }

    if (typeof value === 'number') {
      return Number.isFinite(value) && value > 0;
    }

    if (typeof value === 'object') {
      return Object.keys(value).length > 0;
    }

    return Boolean(value);
  });

  if (hasVersionSignal) {
    return false;
  }

  if (Array.isArray(item?.languages) && item.languages.length > 0) {
    return false;
  }

  if (Array.isArray(item?.modules) && item.modules.length > 0) {
    return false;
  }

  return true;
}

function extractImportId(response, payload) {
  if (payload?.id) {
    return payload.id;
  }

  const location = response.headers.get('location') || response.headers.get('Location');
  if (!location) {
    throw new Error('Snowstorm did not return an import id or Location header.');
  }

  const trimmed = location.replace(/\/+$/, '');
  const parts = trimmed.split('/');
  return parts[parts.length - 1];
}

async function createImport(baseUrl, branch, importType) {
  const { response, payload } = await fetchJson(`${baseUrl}/imports`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      branchPath: branch,
      createCodeSystemVersion: true,
      type: importType
    })
  });

  return extractImportId(response, payload);
}

async function uploadArchive(baseUrl, importId, filePath) {
  const archiveBuffer = await readFile(filePath);
  const formData = new FormData();
  formData.append('file', new Blob([archiveBuffer]), path.basename(filePath));

  const response = await fetch(`${baseUrl}/imports/${importId}/archive`, {
    method: 'POST',
    headers: {
      Accept: 'application/json'
    },
    body: formData
  });

  const payload = await parseResponse(response);
  if (!response.ok) {
    const detail = typeof payload === 'string' ? payload : JSON.stringify(payload);
    throw new Error(`Archive upload failed: ${response.status} ${response.statusText}${detail ? `\n${detail}` : ''}`);
  }
}

async function waitForImport(baseUrl, importId, timeoutMs, pollIntervalMs) {
  const startedAt = Date.now();
  let lastStatus = null;

  while (Date.now() - startedAt < timeoutMs) {
    const { payload } = await fetchJson(`${baseUrl}/imports/${importId}`);
    const status = payload?.status || 'UNKNOWN';

    if (status !== lastStatus) {
      console.log(`Snowstorm import ${importId} status: ${status}`);
      lastStatus = status;
    }

    if (status === 'COMPLETED') {
      return payload;
    }

    if (status === 'FAILED') {
      throw new Error(`Snowstorm import ${importId} failed.\n${JSON.stringify(payload, null, 2)}`);
    }

    await sleep(pollIntervalMs);
  }

  throw new Error(`Timed out waiting for Snowstorm import ${importId} after ${timeoutMs}ms.`);
}

async function updateCodeSystemName(baseUrl, shortName, name) {
  const { payload } = await fetchJson(`${baseUrl}/codesystems/${encodeURIComponent(shortName)}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name
    })
  });

  console.log('Code system update response:');
  console.log(JSON.stringify(summarizeCodeSystem(payload), null, 2));
}

async function main() {
  const options = parseArgs(process.argv.slice(2));

  if (options.help) {
    printHelp();
    return;
  }

  const baseUrl = normalizeBaseUrl(options.baseUrl);
  const filePath = path.resolve(options.file);

  console.log(`Snowstorm base URL: ${baseUrl}`);
  console.log(`Import file: ${filePath}`);
  console.log(`Target branch: ${options.branch}`);
  console.log(`Code system short name: ${options.codeSystemShortName}`);
  console.log(`Code system name: ${options.codeSystemName}`);
  console.log(`Import type: ${options.importType}`);

  await waitForSnowstorm(baseUrl);
  await logCodeSystems(baseUrl, 'Code systems before import');

  if (options.updateNameOnly) {
    await updateCodeSystemName(baseUrl, options.codeSystemShortName, options.codeSystemName);
    await logCodeSystems(baseUrl, 'Code systems after name update');
    console.log(`Updated code system ${options.codeSystemShortName} name to "${options.codeSystemName}".`);
    return;
  }

  if (!options.force) {
    await assertSnowstormLooksEmpty(baseUrl);
  }

  const importId = await createImport(baseUrl, options.branch, options.importType);
  console.log(`Created Snowstorm import job: ${importId}`);

  await uploadArchive(baseUrl, importId, filePath);
  console.log('RF2 archive uploaded successfully.');

  const result = await waitForImport(baseUrl, importId, options.timeoutMs, options.pollIntervalMs);
  await updateCodeSystemName(baseUrl, options.codeSystemShortName, options.codeSystemName);
  await logCodeSystems(baseUrl, 'Code systems after import');
  console.log(`Snowstorm import completed successfully for branch ${options.branch}.`);
  console.log(JSON.stringify({
    importId,
    status: result?.status || 'COMPLETED',
    branchPath: result?.branchPath || options.branch
  }, null, 2));
}

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});

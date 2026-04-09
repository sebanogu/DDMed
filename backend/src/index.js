const http = require('http');
const {
  ensureSchema,
  seedDemoData,
  findUserByCredentials,
  findUserById,
  getUserMemberships,
  createSession,
  getSession,
  updateSessionTenant,
  deleteSession,
  clearDemoSessions,
} = require('./auth-repository');
const { rolePermissions } = require('./permissions');

const port = process.env.PORT || 3000;

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
}

function sendJson(res, statusCode, body) {
  setCorsHeaders(res);
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => {
      if (chunks.length === 0) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')));
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
}

function getTokenFromRequest(req) {
  const header = req.headers.authorization || '';
  return header.startsWith('Bearer ') ? header.slice('Bearer '.length) : null;
}

async function buildSessionPayload(user, activeTenantId) {
  const memberships = await getUserMemberships(user.id);
  const activeMembership =
    memberships.find((membership) => membership.tenantId === activeTenantId)
    || memberships.find((membership) => membership.tenantStatus === 'active')
    || memberships[0]
    || null;

  return {
    user: {
      id: user.id,
      email: user.email,
      displayName: user.display_name,
    },
    memberships,
    activeTenant: activeMembership
      ? {
          tenantId: activeMembership.tenantId,
          tenantName: activeMembership.tenantName,
          tenantStatus: activeMembership.tenantStatus,
        }
      : null,
    effectiveRoles: activeMembership ? [...activeMembership.roles] : [],
    effectivePermissions: activeMembership ? [...activeMembership.permissions] : [],
    availableRoles: Array.from(new Set(memberships.flatMap((membership) => membership.roles))).sort(),
  };
}

async function authenticate(req, res) {
  const token = getTokenFromRequest(req);
  if (!token) {
    sendJson(res, 401, { error: 'unauthenticated', message: 'A valid session is required.' });
    return null;
  }

  const session = await getSession(token);
  if (!session) {
    sendJson(res, 401, { error: 'unauthenticated', message: 'A valid session is required.' });
    return null;
  }

  const user = await findUserById(session.user_id);
  if (!user) {
    await deleteSession(token);
    sendJson(res, 401, { error: 'unauthenticated', message: 'The current session is no longer valid.' });
    return null;
  }

  const payload = await buildSessionPayload(user, session.active_tenant_id);
  return { token, session, user, payload };
}

async function requirePermission(req, res, permission) {
  const auth = await authenticate(req, res);
  if (!auth) {
    return null;
  }

  if (!auth.payload.effectivePermissions.includes(permission)) {
    sendJson(res, 403, {
      error: 'forbidden',
      message: `The active tenant membership does not grant ${permission}.`,
      requiredPermission: permission,
      activeTenant: auth.payload.activeTenant,
      effectiveRoles: auth.payload.effectiveRoles,
    });
    return null;
  }

  return auth;
}

async function handleLogin(req, res) {
  let body;
  try {
    body = await parseJsonBody(req);
  } catch (_error) {
    sendJson(res, 400, { error: 'invalid_json', message: 'The request body must be valid JSON.' });
    return;
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body.password === 'string' ? body.password : '';
  const preferredTenantId = typeof body.tenantId === 'string' ? body.tenantId : null;
  const user = await findUserByCredentials(email, password);

  if (!user) {
    sendJson(res, 401, { error: 'invalid_credentials', message: 'Invalid email or password.' });
    return;
  }

  const memberships = await getUserMemberships(user.id);
  const defaultTenant =
    memberships.find((membership) => membership.tenantId === preferredTenantId)
    || memberships.find((membership) => membership.tenantStatus === 'active')
    || memberships[0]
    || null;

  const token = await createSession(user.id, defaultTenant ? defaultTenant.tenantId : null);
  const session = await buildSessionPayload(user, defaultTenant ? defaultTenant.tenantId : null);

  sendJson(res, 200, {
    token,
    session,
    audit: {
      event: 'sign-in',
      at: new Date().toISOString(),
    },
  });
}

async function handleSwitchTenant(req, res) {
  const auth = await authenticate(req, res);
  if (!auth) {
    return;
  }

  let body;
  try {
    body = await parseJsonBody(req);
  } catch (_error) {
    sendJson(res, 400, { error: 'invalid_json', message: 'The request body must be valid JSON.' });
    return;
  }

  const tenantId = typeof body.tenantId === 'string' ? body.tenantId : '';
  const membership = auth.payload.memberships.find((candidate) => candidate.tenantId === tenantId);
  if (!membership) {
    sendJson(res, 404, {
      error: 'membership_not_found',
      message: 'The requested tenant is not associated with the authenticated user.',
    });
    return;
  }

  await updateSessionTenant(auth.token, membership.tenantId);
  const session = await buildSessionPayload(auth.user, membership.tenantId);

  sendJson(res, 200, {
    session,
    audit: {
      event: 'tenant-switched',
      tenantId: membership.tenantId,
      at: new Date().toISOString(),
    },
  });
}

async function handleLogout(req, res) {
  const token = getTokenFromRequest(req);
  if (token) {
    await deleteSession(token);
  }

  sendJson(res, 200, {
    success: true,
    audit: {
      event: 'sign-out',
      at: new Date().toISOString(),
    },
  });
}

async function handleRequest(req, res) {
  if (req.method === 'OPTIONS') {
    setCorsHeaders(res);
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url === '/health') {
    sendJson(res, 200, {
      status: 'ok',
      service: 'ddmed-backend',
      features: ['tenant-aware-auth', 'multi-role-rbac', 'postgresql-persistence'],
    });
    return;
  }

  if (req.method === 'POST' && req.url === '/api/auth/login') {
    await handleLogin(req, res);
    return;
  }

  if (req.method === 'GET' && req.url === '/api/auth/session') {
    const auth = await authenticate(req, res);
    if (!auth) {
      return;
    }
    sendJson(res, 200, { session: auth.payload });
    return;
  }

  if (req.method === 'POST' && req.url === '/api/auth/switch-tenant') {
    await handleSwitchTenant(req, res);
    return;
  }

  if (req.method === 'POST' && req.url === '/api/auth/logout') {
    await handleLogout(req, res);
    return;
  }

  if (req.method === 'GET' && req.url === '/api/auth/permission-matrix') {
    const auth = await authenticate(req, res);
    if (!auth) {
      return;
    }

    sendJson(res, 200, { rolePermissions, session: auth.payload });
    return;
  }

  if (req.method === 'GET' && req.url === '/api/workspace/summary') {
    const auth = await requirePermission(req, res, 'workspace.view');
    if (!auth) {
      return;
    }

    sendJson(res, 200, {
      tenant: auth.payload.activeTenant,
      user: auth.payload.user,
      effectiveRoles: auth.payload.effectiveRoles,
      effectivePermissions: auth.payload.effectivePermissions,
      highlights: [
        'Tenant-aware sessions are stored in PostgreSQL.',
        'Effective permissions are derived from the active tenant membership.',
        'Multiple roles are resolved into a merged permission set.',
      ],
    });
    return;
  }

  if (req.method === 'GET' && req.url === '/api/workspace/admin') {
    const auth = await requirePermission(req, res, 'tenant.manage');
    if (!auth) {
      return;
    }

    sendJson(res, 200, {
      message: 'Admin workspace access granted.',
      invitations: [
        { email: 'new.clinician@north.example', status: 'pending' },
        { email: 'staff.member@north.example', status: 'accepted' },
      ],
      actions: ['invite-user', 'assign-roles', 'review-memberships'],
      audit: {
        event: 'admin-workspace-opened',
        at: new Date().toISOString(),
      },
    });
    return;
  }

  if (req.method === 'GET' && req.url === '/api/workspace/clinical') {
    const auth = await requirePermission(req, res, 'clinical.read');
    if (!auth) {
      return;
    }

    sendJson(res, 200, {
      message: 'Clinical workspace access granted.',
      queues: [
        { name: 'Lab review', openItems: 6 },
        { name: 'Terminology validation', openItems: 3 },
      ],
      audit: {
        event: 'clinical-workspace-opened',
        at: new Date().toISOString(),
      },
    });
    return;
  }

  if (req.method === 'GET' && req.url === '/api/workspace/support') {
    const auth = await requirePermission(req, res, 'support.access');
    if (!auth) {
      return;
    }

    sendJson(res, 200, {
      message: 'Support workspace access granted.',
      tools: ['tenant-status-review', 'audit-log-inspection'],
      audit: {
        event: 'support-workspace-opened',
        at: new Date().toISOString(),
      },
    });
    return;
  }

  sendJson(res, 404, {
    error: 'not_found',
    message: 'The requested resource does not exist.',
  });
}

async function main() {
  await ensureSchema();
  if (process.env.SEED_DEMO_AUTH === 'true') {
    await seedDemoData();
  } else {
    await clearDemoSessions();
  }

  const server = http.createServer((req, res) => {
    handleRequest(req, res).catch((error) => {
      console.error(error);
      sendJson(res, 500, {
        error: 'internal_error',
        message: 'Unexpected server error.',
      });
    });
  });

  server.listen(port, () => {
    console.log(`ddmed-backend listening on port ${port}`);
  });
}

main().catch((error) => {
  console.error('Failed to start backend', error);
  process.exit(1);
});

function getConfiguredBackendBaseUrl(): string | null {
  const runtimeConfiguredUrl = window.__DDMED_BACKEND_BASE_URL__;
  if (typeof runtimeConfiguredUrl === 'string' && runtimeConfiguredUrl.trim()) {
    return runtimeConfiguredUrl.trim();
  }

  try {
    const storedUrl = window.localStorage.getItem('ddmed.backendBaseUrl');
    if (storedUrl && storedUrl.trim()) {
      return storedUrl.trim();
    }
  } catch (_error) {
    return null;
  }

  return null;
}

export function getBackendBaseUrl(): string {
  const configuredBaseUrl = getConfiguredBackendBaseUrl();
  if (configuredBaseUrl) {
    return configuredBaseUrl;
  }

  const { hostname, protocol } = window.location;

  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:3000';
  }

  return `${protocol}//${hostname}:3000`;
}

export function isBackendUrl(url: string): boolean {
  const backendBaseUrl = getBackendBaseUrl();
  return url.startsWith(backendBaseUrl) || url.startsWith('/api/');
}

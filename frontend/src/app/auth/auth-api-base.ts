export function getBackendBaseUrl(): string {
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

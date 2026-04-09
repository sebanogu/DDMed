import { createReadStream } from 'node:fs';
import { access, stat } from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';

const root = path.resolve(process.argv[2] || 'dist');
const port = Number(process.argv[3] || process.env.PORT || 4200);

const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.map', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.woff', 'font/woff'],
  ['.woff2', 'font/woff2'],
]);

function resolveRequestPath(urlPath) {
  const safePath = path.normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, '');
  return path.join(root, safePath);
}

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url || '/', `http://${req.headers.host || '127.0.0.1'}`);
  let filePath = resolveRequestPath(requestUrl.pathname);

  try {
    const currentStat = await stat(filePath).catch(() => null);
    if (currentStat?.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    if (!(await fileExists(filePath))) {
      filePath = path.join(root, 'index.html');
    }

    const extension = path.extname(filePath);
    res.writeHead(200, {
      'Content-Type': contentTypes.get(extension) || 'application/octet-stream',
      'Cache-Control': 'no-cache',
    });
    createReadStream(filePath).pipe(res);
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`Static server error: ${error instanceof Error ? error.message : 'unknown error'}`);
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Serving ${root} on http://127.0.0.1:${port}`);
});

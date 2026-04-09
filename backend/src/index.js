const http = require('http');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', service: 'ddmed-backend' }));
    return;
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      service: 'ddmed-backend',
      message: 'Backend scaffold is in place. Product APIs are not implemented yet.'
    })
  );
});

server.listen(port, () => {
  console.log(`ddmed-backend listening on port ${port}`);
});

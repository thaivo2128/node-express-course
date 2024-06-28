const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.end('Welcome to our home page');
  } else if (req.url === '/about') {
    res.end('Here is short history');
  }
  res.end('Opps');

  res.end();
});

server.listen(3000);

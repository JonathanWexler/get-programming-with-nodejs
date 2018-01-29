'use strict';

const port = 3000,
  http = require('http'),
  httpStatus = require('http-status-codes'),
  app = http.createServer();

app.on('request', (req, res) => {
  res.writeHead(httpStatus.OK, {
    "Content-Type": "text/html"
  });

  res.end("<h1>This will show on the screen.</h1>");
});

app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);
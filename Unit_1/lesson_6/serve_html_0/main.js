'use strict';

const port = 3000,
  http = require('http'),
  httpStatus = require('http-status-codes'),
  fs = require('fs');

// Map of routes and view templates
let routeMap = {
  '/': 'views/index.html'
};

http.createServer((req, res) => {
  if (routeMap[req.url]) {
    fs.readFile(routeMap[req.url], (error, data) => {
      res.writeHead(httpStatus.OK, {
        "Content-Type": "text/html"
      });
      res.write(data);
      res.end();
    });
  } else {
    res.writeHead(httpStatus.OK, {
      "Content-Type": "text/html"
    });
    res.end('<h1>Sorry, not found.</h1>');
  }
}).listen(port);
console.log(`The server has started and is listening on port number: ${port}`);
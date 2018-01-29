'use strict';

// This method given an object, returns a nicely formatted JSON string representation.
let getJSONString = (obj) => {
  return JSON.stringify(obj, null, 2);
}

const port = 3000,
  http = require('http'),
  httpStatus = require('http-status-codes'),
  app = http.createServer();

app.on('request', (req, res) => {
  console.log(`Method: ${getJSONString(req.method)}`);
  console.log(`URL: ${getJSONString(req.url)}`);
  console.log(`Headers: ${getJSONString(req.headers)}`);

  res.writeHead(httpStatus.OK, {
    "Content-Type": "text/html"
  });

  res.end("<h1>This will show on the screen.</h1>");
});

app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);
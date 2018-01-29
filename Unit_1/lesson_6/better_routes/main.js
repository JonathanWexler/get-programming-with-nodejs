'use strict';

const port = 3000,
  http = require('http'),
  httpStatusCodes = require('http-status-codes'),
  router = require('./router'),
  fs = require('fs'),
  plainTextContentType = {
    "Content-Type": "text/plain"
  },
  htmlContentType = {
    "Content-Type": "text/html"
  };

router.get('/', (req, res) => {
  res.writeHead(httpStatusCodes.OK, plainTextContentType);
  res.end("INDEX");
});

router.get('/index.html', (req, res) => {
  res.writeHead(httpStatusCodes.OK, htmlContentType);
  customReadFile('views/index.html', res);
});

router.post('/', (req, res) => {
  res.writeHead(httpStatusCodes.OK, plainTextContentType);
  res.end("POSTED");
});

function customReadFile(file, res) {
  let contents = "";
  fs.readFile(`./${file}`, (errors, data) => {
    if (errors) {
      console.log("Error reading the file...");
    }
    res.end(data);
  });
}

http.createServer(router.handle).listen(3000);
console.log(`The server has started and is listening on port number: ${port}`);
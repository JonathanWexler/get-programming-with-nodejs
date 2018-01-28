'use strict';

// This serves as the dictionary of all responses.
// URL is the key and the sample HTML response in the value.
const routeResponseMap = {
  '/info': '<h1>Info Page</h1>',
  '/contact': '<h1>Contact Us</h1>'
};

const port = 3000,
  http = require('http'),
  app = http.createServer((req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });

    if (routeResponseMap[req.url]) {
      res.end(routeResponseMap[req.url]);
    } else {
      res.end('<h1>Welcome!</h1>');
    }
  }).listen(port);

app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);
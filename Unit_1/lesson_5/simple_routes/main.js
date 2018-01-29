'use strict';

// This serves as the dictionary of all responses.
// URL is the key and the sample HTML response in the value.
const routeResponseMap = {
  '/info': '<h1>Info Page</h1>',
  '/contact': '<h1>Contact Us</h1>',
  '/about': '<h1>Learn More About Us.</h1>',
  '/hello': '<h1>Say hello by emailing us here</h1>',
  '/error': '<h1>Sorry the page you are looking for is not here.</h1>'
};

const port = 3000,
  http = require('http'),
  httpStatus = require('http-status-codes'),
  app = http.createServer((req, res) => {
    res.writeHead(httpStatus.OK, {
      'Content-Type': 'text/html'
    });

    if (routeResponseMap[req.url]) {
      res.end(routeResponseMap[req.url]);
    } else {
      setTimeout(() => {
        res.end('<h1>Welcome!</h1>');
      }, 2000);
    }
  }).listen(port);

app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);
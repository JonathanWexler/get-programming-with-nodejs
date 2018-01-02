'use strict';

const http = require('http'),
  app = http.createServer((req, res) =>{
  res.writeHead(200, {'Content-Type': 'text/html'})
  if (req.url === '/info') {
    res.end('<h1>Info Page</h1>')
  } else if (req.url === '/contact') {
    res.end('<h1>Contact Us</h1>')
  } else {
    res.end('<h1>Welcome!</h1>')
  }
}).listen(3000);

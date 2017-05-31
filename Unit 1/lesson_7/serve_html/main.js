const http = require('http');
const fs = require('fs');

http.createServer( (req, res) => {
  if(req.url === '/') {
    fs.readFile('views/index.html', (error, data) => {
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(data);
      res.end();
    });
  } else{
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end('<h1>Sorry, not found.</h1>');
  }
}).listen(3000);

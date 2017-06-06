const http = require('http');
const server = http.createServer((request, response) => {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("<h1>Hello, Universe!</h1>");
  response.end();
});

server.listen(3000);

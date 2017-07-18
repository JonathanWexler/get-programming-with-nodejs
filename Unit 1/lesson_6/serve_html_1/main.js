const http = require('http');
const fs = require('fs');

http.createServer( (req, res) => {
  fs.readFile(`views${req.url}.html`, (error, data) => {
    if (error) {
      res.writeHead(404);
      res.write("FILE NOT FOUND");
    } else {
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(data);
    }
    res.end();
  });
}).listen(3000);

const http = require('http');
const app = http.createServer();

app.on('request',(req, res) => {
  console.log(req.method);
  console.log(req.url);
  console.log(req.headers);
  res.writeHead(200, {"Content-Type": "text/html"});
  res.end("<h1>This will show on the screen.</h1>");
});
app.listen(3000);

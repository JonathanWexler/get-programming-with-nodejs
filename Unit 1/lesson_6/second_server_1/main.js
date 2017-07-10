const http = require('http');
const app = http.createServer();

app.on('request',(req, res) => {
  res.writeHead(200, {"Content-Type": "text/html"});
  res.end("<h1>This will show on the screen.</h1>");
});
app.listen(3000);

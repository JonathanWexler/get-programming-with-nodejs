const http = require('http');
const app = http.createServer();

app.on('request',(req, res) => {
  var body = [];
  req.on('data',(body_data) => {
    body.push(body_data);
  });
  req.on('end', () => {
    body = Buffer.concat(body).toString();
    console.log(`Request Body Contents: ${body}`);
  });
  // rest of code from section 1
});

app.listen(3000);

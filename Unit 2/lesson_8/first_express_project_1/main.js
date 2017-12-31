'strict mode';

const express = require('express'),
 app = express();
 
app.get('/', (req, res) => {
  console.log(req.params)
  console.log(req.body)
  console.log(req.route)
  console.log(req.query)
  res.send('Hello, Universe!');
}).listen(3000, function () {
  console.log("Server running at http://localhost:3000");
});

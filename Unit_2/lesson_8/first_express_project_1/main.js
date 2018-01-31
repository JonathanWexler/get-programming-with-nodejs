'use strict';

const port = 3000,
  express = require('express'),
  app = express();

app.get('/', (req, res) => {
  console.log(req.params)
  console.log(req.body)
  console.log(req.route)
  console.log(req.query)
  res.send('Hello, Universe!');
}).listen(port, function () {
  console.log(`The Express.js server has started and is listening on port number: ${port}`);
});
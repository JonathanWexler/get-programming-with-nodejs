'use strict';

const port = 3000,
  express = require('express'),
  app = express();

app.use((req, res, next) => {
  console.log(`request made to: ${req.url}`);
  next();
});

app.get('/items/:vegetable', (req, res) => {
  res.send(req.params.vegetable);
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
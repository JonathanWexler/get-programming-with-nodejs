'use strict';

const express = require('express'),
 app = express();

app.use((req, res, next) => {
  console.log(`request made to: ${req.url}`);
  next();
});

app.get('/items/:vegetable', (req, res) => {
  let veg = req.params.vegetable;
  res.send(`This is the page for ${veg}`);
});

app.listen(3000, () => {
  console.log("Server running");
});

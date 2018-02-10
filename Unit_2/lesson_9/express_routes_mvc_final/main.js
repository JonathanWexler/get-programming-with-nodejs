'use strict';

const port = 3000,
  express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  homeController = require('./controllers/homeController');

app.use(homeController.logRequestPaths);

app.get('/items/:vegetable', homeController.sendReqParam);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
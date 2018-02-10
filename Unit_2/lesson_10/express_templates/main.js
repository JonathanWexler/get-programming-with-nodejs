'use strict';

const express = require('express'),
  layouts = require('express-ejs-layouts'),
  app = express(),
  homeController = require('./controllers/homeController');

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');

app.use(layouts);
app.use(homeController.logRequestPaths);

app.get('/items/:vegetable', homeController.sendReqParam);
app.get('/name/:myName', homeController.respondWithName);

app.listen(app.get('port'), () => {
  console.log(`Server running on port: ${app.get('port')}`);
});
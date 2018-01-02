'strict mode';

const express = require('express'),
 app = express(),
 bodyParser = require('body-parser'),
 homeController = require('./controllers/homeController');


app.use(homeController.logRequestPaths);

app.get('/items/:vegetable', homeController.sendReqParam);

app.listen(3000, () => {
  console.log("Server running");
});

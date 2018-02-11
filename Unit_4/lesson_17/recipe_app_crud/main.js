'use strict';

const express = require('express'),
  layouts = require('express-ejs-layouts'),
  app = express(),

  homeController = require('./controllers/homeController'),
  errorController = require('./controllers/errorController'),
  subscribersController = require('./controllers/subscribersController'),

  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),

  Subscriber = require('./models/subscriber');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/recipe_db');
var db = mongoose.connection;

db.once('open', () => {
  console.log("Successfully connected to MongoDB using Mongoose!")
});

app.set('port', process.env.PORT || 3000);

app.set('view engine', 'ejs');
app.use(layouts);
app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/subscribers', subscribersController.getAllSubscribers);
app.get('/subscribe', subscribersController.getSubscriptionPage);
app.post('/subscribe', subscribersController.saveSubscriber);

app.get('/courses', homeController.showCourses);
app.get('/contact', homeController.showSignUp);
app.post('/sign-up', homeController.postedSignUpForm);
app.post('/contact', homeController.postedContactForm);

// Error middleware
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get('port'), () => {
  console.log(`Server running at http://localhost:${app.get('port')}`);
});
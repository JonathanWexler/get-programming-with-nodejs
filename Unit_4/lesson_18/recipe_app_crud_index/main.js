'use strict';

const express = require('express'),
  layouts = require('express-ejs-layouts'),
  app = express(),

  homeController = require('./controllers/homeController'),
  errorController = require('./controllers/errorController'),
  subscribersController = require('./controllers/subscribersController'),
  coursesController = require('./controllers/coursesController'),
  usersController = require('./controllers/usersController'),

  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/recipe_db');
var db = mongoose.connection;

db.once('open', () => { console.log("Successfully connected with Mongoose!")});

app.set('port', process.env.PORT || 3000);

app.set('view engine', 'ejs');
app.use(layouts);
app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/users', usersController.index, usersController.indexView);
app.get('/subscribers', subscribersController.index, subscribersController.indexView);
app.get('/courses', coursesController.index, coursesController.indexView);

app.get('/subscribe', subscribersController.getSubscriptionPage);
app.post('/subscribe', subscribersController.saveSubscriber);

app.get('/courses', homeController.showCourses );
app.get('/contact', homeController.showSignUp );
app.post('/sign-up',homeController.postedSignUpForm );
app.post('/contact', homeController.postedContactForm);

// Error middleware
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get('port'), () => {
  console.log("Server running at http://localhost:3000");
});

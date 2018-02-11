'use strict';

const express = require('express'),
  layouts = require('express-ejs-layouts'),
  app = express(),
  homeController = require('./controllers/homeController'),
  errorController = require('./controllers/errorController'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  Subscriber = require('./models/subscriber');

mongoose.connect('mongodb://localhost/recipe_db');
var db = mongoose.connection;

let subscriber1 = new Subscriber({
  name: "Jon Wexler",
  email: "jon@jonwexler.com"
});
subscriber1.save((error, savedDocument, next) => {
  if (error) next(error);
  console.log(savedDocument);
});

var myQuery = Subscriber.findOne({
  name: "Jon Wexler"
}).where('email', /wexler/);
myQuery.exec((error, data) => {
  if (data) console.log(data.name);
});

db.once('open', () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
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
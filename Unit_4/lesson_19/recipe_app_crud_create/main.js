'use strict';

const express = require('express'),
layouts = require('express-ejs-layouts'),
app = express(),
router = express.Router(),

homeController = require('./controllers/homeController'),
errorController = require('./controllers/errorController'),
subscribersController = require('./controllers/subscribersController'),
coursesController = require('./controllers/coursesController'),

bodyParser = require('body-parser'),
mongoose = require('mongoose'),

usersController = require('./controllers/usersController');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/recipe_db');
var db = mongoose.connection;

db.once('open', () => { console.log("Successfully connected to MongoDB using Mongoose!")});

app.set('port', process.env.PORT || 3000);

app.set('view engine', 'ejs')
app.use(layouts);

router.use(express.static(`${__dirname}/public`));

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/', homeController.index);

router.get('/users', usersController.index, usersController.indexView);
router.get('/users/new', usersController.new );
router.post('/users/create', usersController.create, usersController.redirectView );

router.get('/subscribers', subscribersController.index, subscribersController.indexView);
router.get('/subscribers/new', subscribersController.new );
router.post('/subscribers/create', subscribersController.create, subscribersController.redirectView );
router.get('/subscribe',  subscribersController.new);

router.get('/courses', coursesController.index, coursesController.indexView);
router.get('/courses/new', coursesController.new );
router.post('/courses/create', coursesController.create, coursesController.redirectView );


router.get('/courses', homeController.showCourses );
router.get('/contact', homeController.showSignUp );
router.post('/sign-up',homeController.postedSignUpForm );
router.post('/contact', homeController.postedContactForm);

// Error middleware
router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

app.use("/",router);


app.listen(app.get('port'), () => {
  console.log(`Server running at http://localhost:${app.get('port')}`);
});

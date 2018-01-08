'use strict';

const express = require('express'),
layouts = require('express-ejs-layouts'),
app = express(),
router = express.Router(),
methodOverride = require('method-override'),
connectFlash = require('connect-flash'),
passport = require('passport'),
User = require('./models/user'),
cookieParser = require('cookie-parser'),
expressSession = require('express-session'),
expressValidator = require('express-validator'),

homeController = require('./controllers/homeController'),
errorController = require('./controllers/errorController'),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
subscribersController = require('./controllers/subscribersController.js'),
usersController = require('./controllers/usersController.js'),
coursesController = require('./controllers/coursesController.js');


mongoose.connect('mongodb://localhost/confetti_cuisine');
var db = mongoose.connection;

app.set('port', process.env.PORT || 3000);

app.set('view engine', 'ejs');
app.use(layouts);
app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser('secretCuisine123'));
app.use(expressSession({ secret: 'secretCuisine123', cookie: { maxAge: 4000000 }, resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(connectFlash());
app.use(expressValidator());

app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});

router.use(methodOverride('_method', { methods: ['POST', 'GET'] }));

router.get('/', homeController.index);

router.get('/users', usersController.index, usersController.indexView);
router.get('/users/new', usersController.new );
router.post('/users/create', usersController.validate, usersController.create, usersController.redirectView );

router.get('/users/login', usersController.login );
router.post('/users/login', usersController.authenticate );
router.get('/users/logout', usersController.logout, usersController.redirectView );

router.get('/users/:id/edit', usersController.edit );
router.put('/users/:id/update', usersController.update, usersController.redirectView );
router.get('/users/:id', usersController.show, usersController.showView );
router.delete('/users/:id/delete', usersController.delete, usersController.redirectView  );

router.get('/subscribers', subscribersController.index, subscribersController.indexView);
router.get('/subscribers/new', subscribersController.new );
router.post('/subscribers/create', subscribersController.create, subscribersController.redirectView );
router.get('/subscribers/:id/edit', subscribersController.edit );
router.put('/subscribers/:id/update', subscribersController.update, subscribersController.redirectView );
router.get('/subscribers/:id', subscribersController.show, subscribersController.showView );
router.delete('/subscribers/:id/delete', subscribersController.delete, subscribersController.redirectView  );

router.get('/courses', coursesController.index, coursesController.indexView);
router.get('/courses/new', coursesController.new );
router.post('/courses/create', coursesController.create, coursesController.redirectView );
router.get('/courses/:id/edit', coursesController.edit );
router.put('/courses/:id/update', coursesController.update, coursesController.redirectView );
router.get('/courses/:id', coursesController.show, coursesController.showView );
router.delete('/courses/:id/delete', coursesController.delete, coursesController.redirectView  );

router.get('/contact', subscribersController.new);
router.post('/subscribe', subscribersController.create, subscribersController.redirectView );

router.post('/sign-up',homeController.postedSignUpForm );
router.post('/contact', homeController.postedContactForm);

// Error middleware
router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

app.use("/",router);

app.listen(app.get('port'), () => {
  console.log("Server running at http://localhost:3000");
});

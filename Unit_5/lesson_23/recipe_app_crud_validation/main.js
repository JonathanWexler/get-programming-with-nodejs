'use strict';

const express = require('express'),
layouts = require('express-ejs-layouts'),
app = express(),
router = express.Router(),

homeController = require('./controllers/homeController'),
errorController = require('./controllers/errorController'),
subscribersController = require('./controllers/subscribersController'),
coursesController = require('./controllers/coursesController'),
usersController = require('./controllers/usersController'),

bodyParser = require('body-parser'),
expressValidator = require('express-validator'),
mongoose = require('mongoose'),
methodOverride = require('method-override'),
cookieParser = require('cookie-parser'),
connectFlash = require('connect-flash'),
expressSession = require('express-session');

app.use(cookieParser('secret_passcode'));
app.use(expressSession({secret: 'secret_passcode', cookie: { maxAge: 4000000 }, resave: false, saveUninitialized: false}));
app.use(connectFlash());

app.use((req, res, next) =>{
  res.locals.flashMessages = req.flash();
  next();
});

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/recipe_db');
var db = mongoose.connection;

db.once('open', () => { console.log("Successfully connected with Mongoose!")});

app.set('port', process.env.PORT || 3000);

app.set('view engine', 'ejs');
app.use(layouts);

router.use(methodOverride('_method', { methods: ['POST', 'GET'] }));

router.use(express.static(`${__dirname}/public`));

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
app.use(expressValidator());

router.get('/', homeController.index);

router.get('/users', usersController.index, usersController.indexView);
router.get('/users/new', usersController.new );
router.post('/users/create', usersController.validate, usersController.create, usersController.redirectView );
router.get('/users/login', usersController.login );
router.post('/users/login', usersController.authenticate, usersController.redirectView );
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


router.get('/subscribe',  subscribersController.new);

router.get('/courses', coursesController.index, coursesController.indexView);
router.get('/courses/new', coursesController.new );
router.post('/courses/create', coursesController.create, coursesController.redirectView );
router.get('/courses/:id/edit', coursesController.edit );
router.put('/courses/:id/update', coursesController.update, coursesController.redirectView );
router.get('/courses/:id', coursesController.show, coursesController.showView );
router.delete('/courses/:id/delete', coursesController.delete, coursesController.redirectView  );




router.get('/courses', homeController.showCourses );
router.get('/contact', homeController.showSignUp );
router.post('/sign-up',homeController.postedSignUpForm );
router.post('/contact', homeController.postedContactForm);

// Error middleware
router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

app.use("/",router);


app.listen(app.get('port'), () => {
  console.log("Server running at http://localhost:3000");
});

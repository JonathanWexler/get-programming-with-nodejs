// Add express and express rotuer
const express = require('express');
const router = express.Router(); //Router(), which is built-in middle layer Routing service by ExpressJS.
const app = express();
app.use(express.static(`${__dirname}/public`));


// UNIT 5
// Lesson 22
const expressSession = require('express-session');
const connectFlash = require('connect-flash');
const cookieParser = require('cookie-parser');

app.use(cookieParser('secret_passcode'));
app.use(expressSession({ secret: 'secret_passcode', cookie: { maxAge: 4000000 }, resave: false, saveUninitialized: false}));
app.use(connectFlash());

//Lesson 24
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

const User = require('./models/user');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const expressValidator = require('express-validator');
app.use(expressValidator());
//Set up layouts and templating
const layouts = require('express-ejs-layouts');
app.set('view engine', 'ejs');
app.use(layouts);

// Set up database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/csa_app_db');
mongoose.Promise = global.Promise;

// App to use body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const methodOverride = require('method-override');
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));


// Add controllers
const homeController = require('./controllers/homeController');
const errorsController = require('./controllers/errorsController');
const subscribersController = require('./controllers/subscribersController');
const coursesController = require('./controllers/coursesController');
const usersController = require('./controllers/usersController');

// Define middlware
router.use(function (req, res, next) {
  console.log("/" + req.method);
  next();
});

app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
})

//Define routes
// USER ROUTES
router.get('/users/login', usersController.login );
router.get('/users/logout', usersController.logout );
router.post('/users/login', usersController.authenticate );

router.get('/users', usersController.index );
router.get('/users/new', usersController.new );
router.post('/users/create', usersController.validate, usersController.create );
router.get('/users/:id', usersController.show );
router.get('/users/:id/edit', usersController.edit );
router.put('/users/:id/update', usersController.update );
router.delete('/users/:id/delete', usersController.delete );




// subscribers ROUTES
router.get('/subscribers', subscribersController.index );
router.get('/subscribers/new', subscribersController.new );
router.post('/subscribers/create', subscribersController.create );
router.get('/subscribers/:id', subscribersController.show );
router.get('/subscribers/:id/edit', subscribersController.edit );
router.put('/subscribers/:id/update', subscribersController.update );
router.delete('/subscribers/:id/delete', subscribersController.delete );
// Courses ROUTES
router.get('/courses', coursesController.index );
router.get('/courses/new', coursesController.new );
router.post('/courses/create', coursesController.create );
router.get('/courses/:id', coursesController.show );
router.get('/courses/:id/edit', coursesController.edit );
router.put('/courses/:id/update', coursesController.update );
router.delete('/courses/:id/delete', coursesController.delete );


router.get('/courses', coursesController.index );
router.get('/contact', subscribersController.new );
router.get('/', homeController.index );

// Tell the app to use the router we defined
app.use("/",router);

app.listen(3000, ()=>{
  console.log(`Server running at http://localhost:3000`);
});

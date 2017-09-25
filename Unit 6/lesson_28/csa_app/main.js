// Add express and express rotuer
const express = require('express');
const router = require('./routes/index');
const app = express();
app.use(express.static(`${__dirname}/public`));

const expressSession = require('express-session');
const connectFlash = require('connect-flash');
const cookieParser = require('cookie-parser');

app.use(cookieParser('secret_passcode'));
app.use(expressSession({ secret: 'secret_passcode', cookie: { maxAge: 4000000 }, resave: false, saveUninitialized: false}));
app.use(connectFlash());

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

// Tell the app to use the router we defined
app.use('/', router);

app.listen(3000, ()=>{
  console.log(`Server running at http://localhost:3000`);
});

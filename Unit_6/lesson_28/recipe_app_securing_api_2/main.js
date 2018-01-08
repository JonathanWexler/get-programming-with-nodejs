'use strict';

const express = require('express'),
layouts = require('express-ejs-layouts'),
app = express(),
passport = require('passport'),
router = require('./routes/index'),

bodyParser = require('body-parser'),
expressValidator = require('express-validator'),
mongoose = require('mongoose'),
methodOverride = require('method-override'),
cookieParser = require('cookie-parser'),
connectFlash = require('connect-flash'),
expressSession = require('express-session'),

User = require('./models/user');


app.use(cookieParser('secret_passcode'));
app.use(expressSession({secret: 'secret_passcode', cookie: { maxAge: 4000000 }, resave: false, saveUninitialized: false}));
app.use(connectFlash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) =>{
  res.locals.flashMessages = req.flash();
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/recipe_db');
var db = mongoose.connection;

db.once('open', () => { console.log("Successfully connected with Mongoose!")});

app.set('port', process.env.PORT || 3000);

app.set('view engine', 'ejs');

app.use(layouts);

app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));

app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(expressValidator());

app.use("/", router);

app.listen(app.get('port'), () => {
  console.log("Server running at http://localhost:3000");
});

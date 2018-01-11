'use strict';

const express = require('express'),
layouts = require('express-ejs-layouts'),
app = express(),
router = require('./routes/index'),
methodOverride = require('method-override'),
connectFlash = require('connect-flash'),
passport = require('passport'),
User = require('./models/user'),
cookieParser = require('cookie-parser'),
expressSession = require('express-session'),
expressValidator = require('express-validator'),
bodyParser = require('body-parser'),
mongoose = require('mongoose');


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

app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));

app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});

app.use("/",router);

app.listen(app.get('port'), () => {
  console.log("Server running at http://localhost:3000");
});

// Add express and express rotuer
const express = require('express'),
router = require('./routes/index'),
app = express(),
expressSession = require('express-session'),
connectFlash = require('connect-flash'),
cookieParser = require('cookie-parser'),
passport = require('passport'),
User = require('./models/user'),
expressValidator = require('express-validator'),
layouts = require('express-ejs-layouts'),
mongoose = require('mongoose'),
bodyParser = require('body-parser'),
methodOverride = require('method-override'),
homeController = require('./controllers/homeController');
errorsController = require('./controllers/errorsController');

var port,
db;

app.use(express.static(`${__dirname}/public`));
app.use(cookieParser('secret_passcode'));
app.use(expressSession({ secret: 'secret_passcode', cookie: { maxAge: 4000000 }, resave: false, saveUninitialized: false}));
app.use(connectFlash());
app.use(passport.initialize());
app.use(passport.session());
app.use(expressValidator());

// App to use body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));

//Set up layouts and templating
app.set('view engine', 'ejs');
app.use(layouts);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Set up database
if (process.env.NODE_ENV === 'test') db = 'mongodb://localhost/confetti_cuisine_test_db';
else db = process.env.MONGODB_URI || 'mongodb://localhost/confetti_cuisine_db';

mongoose.connect(db, { useMongoClient: true });
mongoose.Promise = global.Promise;

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

if (process.env.NODE_ENV === 'test') port = 3001;
else port = process.env.PORT || 3000;

const server = app.listen(port, ()=>{
  console.log(`Server running at http://localhost:${port}`);
});

const io = require('socket.io')(server);
const chatController = require('./controllers/chatController')(io)

module.exports = app;

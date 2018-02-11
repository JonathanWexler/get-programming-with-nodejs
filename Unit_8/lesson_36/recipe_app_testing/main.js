'use strict';

const express = require('express'),
layouts = require('express-ejs-layouts'),
app = express(),
passport = require('passport'),
router = require('./routes/index'),

bodyParser = require('body-parser'),
expressValidator = require('express-validator'),
methodOverride = require('method-override'),
cookieParser = require('cookie-parser'),
connectFlash = require('connect-flash'),
expressSession = require('express-session'),
morgan = require('morgan'),
mongoose = require('mongoose'),

User = require('./models/user');

var db;

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV === 'test') mongoose.connect('mongodb://localhost/recipe_test_db');
else mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/recipe_db');

db = mongoose.connection;
db.once('open', () => { console.log('Successfully connected to MongoDB using Mongoose!'); });
module.exports = db;

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

app.set('port', process.env.PORT || 3000);

app.set('view engine', 'ejs');

app.use(layouts);
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(morgan(':method :url :status * :response-time ms'));

app.use('/', router);

var port;
if (process.env.NODE_ENV === 'test') port = 3001;
else port = process.env.PORT || 3000;

const server = app.listen(port, ()=>{
	console.log(`Server running at http://localhost:${port}`);
}),
io = require('socket.io')(server),
chatController = require('./controllers/chatController')(io);


module.exports = app;

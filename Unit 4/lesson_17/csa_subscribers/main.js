// Add express and express rotuer
const express = require('express');
const router = express.Router(); //Router(), which is built-in middle layer Routing service by ExpressJS.
const app = express();
app.use(express.static(`${__dirname}/public`));

//Set up layouts and templating
const layouts = require('express-ejs-layouts');
app.set('view engine', 'ejs');
app.use(layouts);

// Add controllers
const subscribersController = require('./controllers/subscribersController');
const homeController = require('./controllers/homeController');

// Add models
const Subscriber = require('./models/subscriber');

// App to use body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define middlware
router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

//Define routes
router.get('/courses', homeController.showCourses );
router.get('/contact', homeController.showSignUp );
router.post('/sign-up',homeController.postedSignUpForm );

router.get('/subscribers', subscribersController.getAllSubscribers);
router.get('/subscribe', subscribersController.getSubscriptionPage);
// router.post('/subscribe', subscribersController.saveSubscriber);
router.get('/', (req, res) => {
  res.render('index', {title: "Welcome to Confetti Cuisine"});
});

// Tell the app to use the router we defined
app.use("/",router);

app.listen(3000, ()=>{
  console.log(`Server running at http://localhost:3000`);
});

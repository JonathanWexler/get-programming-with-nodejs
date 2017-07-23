const express = require('express');
const app = express();
const layouts = require('express-ejs-layouts');
const homeController = require('./controllers/homeController');
const errorController = require('./controllers/errorController');

app.set('view engine', 'ejs');
app.use(layouts);
app.use(express.static(`${__dirname}/public`));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/courses', homeController.showCourses );
app.get('/contact', homeController.showSignUp );
app.post('/sign-up',homeController.postedSignUpForm );
app.post('/contact', homeController.postedContactForm);


app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(3000, () => {
   console.log("Server running at http://localhost:3000");
});

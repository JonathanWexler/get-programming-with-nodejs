'strict mode';

const express = require('express'),
  layouts = require('express-ejs-layouts'),
  app = express(),
  homeController = require('./controllers/homeController'),
  errorController = require('./controllers/errorController'),
  bodyParser = require('body-parser'),
  MongoDB = require('mongodb').MongoClient;

MongoDB.connect('mongodb://localhost:27017', (error, client) => {
  if (error) throw err;
  let db = client.db('recipe_db');
  db.collection('contacts').find().toArray( (error, data) => {
    if (error) throw err;
    console.log(data);
  });

  db.collection('contacts').insert({name: "Freddie Mercury", email: "fred@queen.com"}, (error, db)=>{
    if(error) throw error;
    console.log(db);
  });
});

app.set('port', process.env.PORT || 3000);

app.set('view engine', 'ejs');
app.use(layouts);
app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/courses', homeController.showCourses );
app.get('/contact', homeController.showSignUp );
app.post('/sign-up',homeController.postedSignUpForm );
app.post('/contact', homeController.postedContactForm);

// Error middleware
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get('port'), () => {
  console.log("Server running at http://localhost:3000");
});

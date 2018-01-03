// SETUP
const mongoose = require('mongoose'),
db = mongoose.connect('mongodb://localhost/recipe_db');
mongoose.Promise = global.Promise;
var Subscriber = require('./models/subscriber');

//COMMANDS
Subscriber.create({name: "Jon", email: "jon@jonwexler.com", zipCode: "12345"}).then(subscriber => console.log(subscriber)).catch(error=> console.log(error.message));

var subscriber;
Subscriber.findOne({name: "Jon"}).then(result => subscriber = result);
console.log(subscriber.getInfo());

//MODEL ASSOCIATIONS
var Course = require('./models/course'),
  testCourse,
  testSubscriber;
Course.create({title: "Tomato Land", description: "Locally farmed tomatoes only", zipCode: 12345, items: ["cherry", "heirloom"] }).then(g => testCourse = g);
// Course.findOne().then(g => testCourse = g);
Subscriber.findOne({}).then(s => testSubscriber = s);
testSubscriber.courses.push(testCourse);
testSubscriber.save();
Subscriber.populate(testSubscriber, "courses").then(s => console.log(s));

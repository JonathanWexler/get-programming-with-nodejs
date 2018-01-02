const express = require('express');
const mongoose = require('mongoose');
const Subscriber = require('./models/subscriber').Subscriber;
const subscribersController = require('./controllers/subscribersController');
const app = express();

const bodyParser = require('body-parser'); app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/confetti_cuisine');
mongoose.Promise = global.Promise;
let db = mongoose.connection;
app.set('view engine', 'ejs');

var subscriber = new Subscriber({ name: 'Jon', email: "jon@jonwexler.com" });
console.log(subscriber.name);

app.listen(3000);

console.log("SERVER RUNNING AT PORT 3000");

app.get('/', (req, res) => {
  res.send("HOME");
});
app.get('/subscribers', subscribersController.getAllSubscribers);
app.get('/subscribe', subscribersController.getSubscriptionPage);
app.post('/subscribe', subscribersController.saveSubscriber);

subscriber.save((error, data) => {
  if (error) return console.error(error.message);
  console.log(subscriber.getInfo());
});

Subscriber.find((error, allRecords) => {
  if (error) return console.error(error);
  console.log(allRecords);
})

// db.on('error', console.error.bind(console, 'connection error:'));

// You can run something as soon as the db connects, like print number of records
// db.once('open', function() {


// Kitten.find({ name: /^fluff/ }, callback);
// });


// var MongoClient = require('mongodb').MongoClient
//
// MongoClient.connect('mongodb://localhost:27017/csa_app_db', function (err, db) {
//   if (err) throw err
//
//   db.collection('contacts').insert({name: "Freddie Mercury", email: "fred@queen.com"}, (error, db)=>{
//     if(error) throw error;
//     console.log(db);
//   });
//
//   // db.collection('contacts').find().toArray(function (err, result) {
//   //   if (err) throw err
//   //
//   //   console.log(result)
//   // })
// })




// sudo mkdir -p /data/db
// sudo chmod go+w /data/db
// mongo to get into shell
// show dbs --> automatically creates one you mentioned in connection line
// some other commands, no GUI necessary

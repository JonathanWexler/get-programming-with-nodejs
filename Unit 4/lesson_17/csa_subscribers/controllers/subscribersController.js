const mongoose = require('mongoose');
const Subscriber = require('../models/subscriber');
const db = mongoose.connection;


// Finds all subscribers and sends them to the subscribers page
exports.getAllSubscribers = (req, res) => {
  Subscriber.find({}).exec()
  .then(subscribers => res.render('subscribers', {subscribers: subscribers, title: "Subscribers "}))
  .catch(error => {
    console.log(error.message);
    return [];
  }).then(() => console.log('promise complete'));
}
// Load the subscription page
exports.getSubscriptionPage = (req, res) => {
  res.render('subscribe', {title: "subscribe"}) ;
}

//Find last subscriber and search for others with same zip code or else write an error
exports.getSimilarSubscribers = (req, res) => {
  Subscriber.findOne().sort('-created_at')
  .then(subscriber => subscriber.findLocalSubscribers())
  .then(subscribers => res.render('subscribers', {subscribers: subscribers}) )
  .catch(error => res.write("got an error"));
}

exports.create = (req, res) =>{
  let params = req.body;
  if(params){
    Subscriber.create({name: params.name, email: params.email, zipCode: parseInt(params.zipCode)})
    .then(subscriber => console.log(`Subscriber ${subscriber.email} successfully saved`))
    .then(subscriber => res.redirect('/'))
    .catch(error => {
      console.log(error.message)
      res.redirect('subscribe');
    });
  } else {
    res.write("NO PARAMS");
  }
}

exports.show = (req, res) =>{

}

exports.update = (req, res) =>{
  // var subscriber = new Subscriber({ name: 'Jon', email: "jon@jonwexler.com" });
  // console.log(subscriber.name);
  //
  // subscriber.save((error, data) => {
  //   if (error) return console.error(error.message);
  //   console.log(subscriber.getInfo());
  // });
}

exports.delete = (req, res) =>{

}

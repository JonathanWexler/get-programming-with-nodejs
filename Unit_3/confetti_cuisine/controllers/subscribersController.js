const mongoose = require('mongoose');
const Subscriber = require('../models/subscriber').Subscriber;

// exports.getAllSubscribers = (req, res) => {
//   Subscriber.find({}, (error, subscribers) => {
//     if(error) return [];
//     res.render('subscribers', {subscribers: subscribers}) ;
//   })
// }

exports.getAllSubscribers = (req, res) => {
  Subscriber.find({}).exec().then((subscribers) =>{
    res.render('subscribers', {subscribers: subscribers}) ;
  }).catch((error) => {
    console.log(error.message);
    return [];
  }).then(() =>{
    console.log('promise complete');
  })
}
//
// exports.getAllSubscribers = (req, res) => {
//   Subscriber.find({}, (error, subscribers) => {
//     return new Promise((resolve, reject) =>{
//       if(error) reject(error);
//       resolve(subscribers)
//     });
//   }).then((subscribers) =>{
//     res.render('subscribers', {subscribers: subscribers}) ;
//   }).catch((error) => {
//     console.log(error.message);
//     return [];
//   }).then(() =>{
//     console.log('promise complete');
//   })
// }



exports.getSubscriptionPage = (req, res) => {
  res.render('subscribe');
}

exports.saveSubscriber = (req, res) => {
  let newSubscriber = new Subscriber({name: req.body.name, email: req.body.email, zip_code: req.body.zip_code});


  newSubscriber.save().then(result => {
    res.send("Thank you for signing up!");
  }).catch(error => {
    res.send(error);
  });
}

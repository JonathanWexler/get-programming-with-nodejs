const mongoose = require('mongoose');
const Subscriber = require('../models/subscriber');


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
exports.getSubscriptionPage = (req, res) => {
    res.render('subscribe', {title: "subscribe"}) ;
}

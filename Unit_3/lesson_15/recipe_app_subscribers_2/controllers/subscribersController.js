'use strict';

const Subscriber = require('../models/subscriber');

exports.getAllSubscribers = (req, res, next) => {
  Subscriber.find({}, (error, subscribers) => {
    if(error) next(error);
    res.render('subscribers', {subscribers: subscribers});
  });
};

exports.getSubscriptionPage = (req, res) => {
  res.render('subscribe');
};

exports.saveSubscriber = (req, res) => {
  let newSubscriber = new Subscriber({name: req.body.name, email: req.body.email, zipCode: req.body.zipCode});

  newSubscriber.save((error, result) => {
    if (error) res.send(error);
    res.send("Thank you for signing up!");
  });
};

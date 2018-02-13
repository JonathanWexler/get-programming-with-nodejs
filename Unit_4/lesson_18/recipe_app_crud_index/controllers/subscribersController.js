'use strict';

const Subscriber = require('../models/subscriber');

module.exports = {
  index: (req, res, next) => {
    Subscriber.find()
      .then(subscribers => {
        res.locals.subscribers = subscribers;
        next();
      })
      .catch(error => {
        console.log(`Error fetching subscribers: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render('subscribers/index');
  },

  getSubscriptionPage: (req, res) => {
    res.render('subscribe');
  },

  saveSubscriber: (req, res) => {
    let newSubscriber = new Subscriber({
      name: req.body.name,
      email: req.body.email,
      zipCode: req.body.zipCode
    });

    newSubscriber.save((error, result) => {
      if (error) res.send(error);
      res.send("Thank you for signing up!");
    });
  }
};
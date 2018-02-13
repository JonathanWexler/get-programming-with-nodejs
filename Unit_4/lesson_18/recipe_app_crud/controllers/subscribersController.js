'use strict';

const Subscriber = require('../models/subscriber');

module.exports = {
  getAllSubscribers: (req, res) => {
    Subscriber.find({}, (error, subscribers) => {
      return new Promise((resolve, reject) => {
        if (error) reject(error);
        resolve(subscribers)
      });
    }).then((subscribers) => {
      res.render('subscribers', {
        subscribers: subscribers
      });
    }).catch((error) => {
      console.log(error.message);
      return [];
    }).then(() => {
      console.log('promise complete');
    });
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
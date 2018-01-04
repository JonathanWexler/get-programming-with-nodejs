'use strict';

const Subscriber = require('../models/subscriber');

module.exports = {
  index: (req, res, next) => {
    Subscriber.find()
    .then(subscribers => {
      res.locals.subscribers = subscribers;
      next();
    })
    .catch( error =>{
      console.log(`Error fetching subscribers: ${error.message}`);
      next(error);
    });
  },
  indexView: (req, res, next) => {
    res.render('subscribers/index');
  },

  new: (req, res) => {
    res.render('subscribers/new');
  },

  create: (req, res, next) => {
    var subscriberParams = {name: req.body.name, email: req.body.email, zipCode: req.body.zipCode};
    Subscriber.create(subscriberParams)
    .then(subscriber => {
      res.locals.subscriber = subscriber;
      next();
    })
    .catch(error => {
      console.log(`Error saving subscriber: ${error.message}`)
      next(error);
    });
  },

  createView: (req, res) => {
    if (res.locals.subscriber) res.redirect('/subscribers');
    else res.redirect('subscribers/new');
  }
};

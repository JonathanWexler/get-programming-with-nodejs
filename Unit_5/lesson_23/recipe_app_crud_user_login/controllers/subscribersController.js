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
      res.locals.redirect = '/subscribers';
      req.flash('success', `${subscriber.name}'s account created successfully!`);
      res.locals.subscriber = subscriber;
      next();
    })
    .catch(error => {
      console.log(`Error saving subscriber: ${error.message}`);
      req.flash('error', `Failed to create subscriber account because: ${error.message}.`);
      res.locals.redirect = `/subscribers/new`;
      next();
    });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },
  show: (req, res, next) => {
    var subscriberId = req.params.id;
    Subscriber.findById(subscriberId)
    .then(subscriber => {
      res.locals.subscriber = subscriber;
      next();
    })
    .catch(error => {
      console.log(`Error fetching subscriber by ID: ${error.message}`)
      next(error);
    });
  },

  showView: (req, res) => {
    res.render('subscribers/show');
  },

  edit: (req, res, next) => {
    var subscriberId = req.params.id;
    Subscriber.findById(subscriberId)
    .then(subscriber => {
      res.render('subscribers/edit', {subscriber: subscriber});
    })
    .catch(error => {
      console.log(`Error fetching subscriber by ID: ${error.message}`);
      next(error);
    });
  },

  update: (req, res, next) => {
    var subscriberId = req.params.id,
    subscriberParams = {name: req.body.name, email: req.body.email, zipCode: req.body.zipCode};

    Subscriber.findByIdAndUpdate(subscriberId, { $set: subscriberParams })
    .then(subscriber => {
      res.locals.redirect = `/subscribers/${subscriberId}`;
      req.flash('success', `${subscriber.name}'s account updated successfully!`);
      res.locals.subscriber = subscriber;
      next();
    })
    .catch(error => {
      console.log(`Error updating subscriber by ID: ${error.message}`);
      req.flash('error', `Failed to update subscriber account because: ${error.message}.`);
      res.locals.redirect = `/subscribers/${subscriberId}/edit`;
      next();
    });
  },

  delete: (req, res, next) => {
    var subscriberId = req.params.id;
    Subscriber.findByIdAndRemove(subscriberId)
    .then(subscriber => {
      res.locals.redirect = '/subscribers';
      req.flash('success', `${subscriber.name}'s account deleted successfully!`);
      next();
    })
    .catch(error => {
      console.log(`Error deleting subscriber by ID: ${error.message}`);
      next();
    });
  }
};

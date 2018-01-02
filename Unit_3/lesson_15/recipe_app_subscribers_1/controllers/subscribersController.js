'use strict';

const mongoose = require('mongoose'),
 Subscriber = require('../models/subscriber');

exports.getAllSubscribers = (req, res, next) => {
  Subscriber.find({}, (error, subscribers) => {
    if(error) next(error);
    res.render('subscribers', {subscribers: subscribers});
  });
};

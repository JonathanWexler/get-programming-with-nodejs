'use strict';

const mongoose = require('mongoose');

var subscriberSchema = mongoose.Schema({
  name: String,
  email: String,
  zipCode: Number
});

module.exports = mongoose.model('Subscriber', subscriberSchema);

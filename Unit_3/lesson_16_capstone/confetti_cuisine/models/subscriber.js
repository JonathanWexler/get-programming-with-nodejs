'use strict';

const mongoose = require('mongoose');

let subscriberSchema = mongoose.Schema({
  name: String,
  email: String,
  zipCode: Number
});

module.exports = mongoose.model('Subscriber', subscriberSchema); 

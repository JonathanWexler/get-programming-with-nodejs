'use strict';

const mongoose = require('mongoose'),
  Schema = require('mongoose').Schema,
  Subscriber = require('./subscriber'),
  passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
  name: {
    first: {
      type: String,
      trim: true
    },
    last: {
      type: String,
      trim: true
    }
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  zipCode: {
    type: Number,
    min: [10000, 'Zip code too short'],
    max: 99999
  },
  subscribedAccount: {
    type: Schema.Types.ObjectId,
    ref: 'Subscriber'
  },
  courses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course'
  }],
}, {
  timestamps: true
});

userSchema.virtual('fullName').get(function () {
  return `${this.name.first} ${this.name.last}`;
});

userSchema.pre('save', function (next) {
  var user = this;
  if (user.subscribedAccount === undefined) {
    Subscriber.findOne({
        email: user.email
      })
      .then(subscriber => {
        user.subscribedAccount = subscriber;
        next();
      })
      .catch(e => {
        console.log(`Error in connecting subscriber: ${e.message}`);
        next(e);
      });
  } else {
    next();
  }
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email'
});

module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const Subscriber = require('./subscriber');

const passportLocalMongoose = require('passport-local-mongoose');

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
    unique: true
  },
  zipCode:  {
    type: Number,
    min: [1000, 'Zip code too short'],
    max: 99999
  },
  // password: { type: String, required: true },
  courses: [{type: Schema.Types.ObjectId, ref: 'Course'}],
  subscribedAccount : {type: Schema.Types.ObjectId, ref: 'Subscriber'}
},
{
  timestamps: true
});

userSchema.plugin(passportLocalMongoose, {usernameField: 'email'});

userSchema.virtual('fullName').get(function(){
  return `${this.name.first} ${this.name.last}`;
});

userSchema.pre('save', (next) => {
  var user = this;
  if (!user.subscribedAccount) {
    Subscriber.findOne({email: user.email})
    .then(subscriber => {
      user.subscribedAccount = subscriber;
    })
    .catch(e => {
      next(e);
      console.log(`Error in connecting subscriber: ${e.message}`);
    });
  }
  next();
});

module.exports = mongoose.model('User', userSchema);

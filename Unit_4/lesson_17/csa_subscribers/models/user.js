const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const Subscriber = require('./subscriber');

var bcrypt = require('bcrypt');

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
  password: { type: String, required: true },
  groups: [{type: Schema.Types.ObjectId, ref: 'Group'}],
  subscribedAccount : {type: Schema.Types.ObjectId, ref: 'Subscriber'}
},
{
  timestamps: true
});

// userSchema.methods.fullName = function() {
//   return `${this.name.first} ${this.name.last}`;
// }

userSchema.virtual('fullName').get(function(){
  return `${this.name.first} ${this.name.last}`;
});

userSchema.pre('save', function (next) {
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

userSchema.pre('save', function (next) {
  var user = this;

  bcrypt.hash(user.password, 10).then(hash => {
    user.password = hash;
    next();
  })
  .catch(e => {
    next(e);
    console.log(`Error in encrypting password: ${e.message}`);
  });
});

userSchema.methods.passwordComparison = function(inputPassword) {
  var user = this;
  return bcrypt.compare(inputPassword, user.password);
};

module.exports = mongoose.model('User', userSchema);

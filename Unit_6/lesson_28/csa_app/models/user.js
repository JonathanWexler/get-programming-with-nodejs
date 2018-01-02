const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const Subscriber = require('./subscriber');
const randToken = require('rand-token');

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
  subscribedAccount : {type: Schema.Types.ObjectId, ref: 'Subscriber'},
  apiToken: {
    type: String,
    unique: true
  },
},
{
  timestamps: true
});

userSchema.plugin(passportLocalMongoose, {usernameField: 'email'});

userSchema.virtual('fullName').get(function(){
  return `${this.name.first} ${this.name.last}`;
});

// userSchema.statics.check = function(u){
//   return new Promise((resolve, reject) => {
//     var currentUser = u;
//     // console.log(count++);
//     if (!currentUser.apiToken) {
//       let tempToken = null;
//       console.log(tempToken)
//       mongoose.model('User').findOne({'apiToken': tempToken})
//       .then(user => {
//         if (user) {
//           return mongoose.model('User').check(currentUser);
//           // console.log("NOPE")
//         } else {
//           currentUser.apiToken = tempToken;
//           resolve();
//           // next();
//         }
//       })
//       .catch( errors => next());
//       // }
//     }else{
//       resolve();
//       // next();
//     }
//   });
// }

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


// Generate API token
userSchema.pre('save', function (next) {
  var user = this;
  if (!user.apiToken) user.apiToken = randToken.generate(16);
  next();
});

module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');
let userSchema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  // User can have many subscriptions
  subscription: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subscriber'
  }]
});

userSchema.methods.getInfo = function() {
  console.log(this);
  return `Name: ${this.name} Email: ${this.email}`
}

// Rethink this
// exports.getSubscriberById = (id) => {
//   return new Promise((resolve, reject)=>{
//     Subscriber.findById(id, (error, data) => {
//       return error ? reject(error) : resolve(data);
//     });
//   });
// }

module.exports = mongoose.model('User', userSchema);

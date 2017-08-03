const mongoose = require('mongoose');
let subscriberSchema = mongoose.Schema({
  name: String,
  email: String
});

subscriberSchema.methods.getInfo = function() {
  console.log(this);
  return `Name: ${this.name} Email: ${this.email}`
}

let Subscriber = exports.Subscriber = mongoose.model('Subscriber', subscriberSchema);

exports.getSubscriberById = (id) => {
  return new Promise((resolve, reject)=>{
    Subscriber.findById(id, (error, data) => {
      return error ? reject(error) : resolve(data);
    });
  });
}

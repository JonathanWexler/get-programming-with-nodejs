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
// call with getUserById(3)
// .then((data)=>{
//   return data;
// })
// .catch((error)=>{
//   console.log(`Error occured finding a subscriber: ${error.message}`)
// }).then(()=>{
//   console.log("Data Fetch Complete!")
// });

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var subscriberSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  zipCode:  {
    type: Number,
    min: [5, 'Zip Code too Short'],
    max: 8
  }
});

subscriberSchema.methods.getInfo = function() {
  return `Name: ${this.name} Email: ${this.email}`
}

subscriberSchema.methods.findLocalSubscribers = function(){
  return new Promise((resolve, reject)=>{
    return this.model('Subscriber').find({zipCode: this.zipCode});
  })
}

// Static method for finding a single
subscriberSchema.statics.findByName = function(name) {
  return new Promise((resolve, reject) => {
    return this.find({ name: new RegExp(name, 'i') });
  });
};

module.exports = mongoose.model('Subscriber', subscriberSchema);

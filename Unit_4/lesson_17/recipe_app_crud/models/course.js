const mongoose = require('mongoose'),
  Schema = require('mongoose').Schema;

var courseSchema = new Schema({
  title: { 
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  items: [],
  zipCode:  {
    type: Number,
    min: [1000, 'Zip code too short'],
    max: 99999
  }
});

module.exports = mongoose.model('Course', courseSchema);

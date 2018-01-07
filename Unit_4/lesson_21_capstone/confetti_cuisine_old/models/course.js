const mongoose = require('mongoose');
const {Schema} = require('mongoose');

var coursesSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  maxStudents:  {
    type: Number,
    default: 0,
    min: [0, "Course cannot have a negative number of students"]
  },
  cost: {
    type: Number,
    default: 0,
    min: [0, "Course cannot have a negative cost"]
  }
});

module.exports = mongoose.model('Course', coursesSchema);

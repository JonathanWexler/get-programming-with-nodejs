const mongoose = require('mongoose');
const {Schema} = require('mongoose');

var groupSchema = new Schema({
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
  },
  subscribers: [{type: Schema.Types.ObjectId, ref: 'Subscriber'}]
});

module.exports = mongoose.model('Group', groupSchema);

const mongoose = require('mongoose');
const {Schema} = require('mongoose');

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

userSchema.methods.fullName = function() {
  return `${this.name.first} ${this.name.last}`;
}

module.exports = mongoose.model('User', userSchema);

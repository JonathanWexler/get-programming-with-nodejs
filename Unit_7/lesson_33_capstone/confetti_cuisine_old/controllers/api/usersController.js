// Giving access to the user model
const User = require('../models/user');
const passport = require('passport');

// Setting up callback for users index page
exports.index = (req, res) => {
  User.find({})
  .then(users => {
    res.json(users);
  })
  .catch( error =>{
    console.log(`Error fetching users in API: ${error.message}`)
    res.statusCode(500).json({error: "Internal Error"});
  });
}

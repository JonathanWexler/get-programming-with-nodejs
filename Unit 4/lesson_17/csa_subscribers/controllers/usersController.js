const User = require('../models/user');

exports.index = (req, res) => {
  User.find({})
  .then(users => {
    res.render('users/index', {users: users, title: "All Users"})
  })
  .catch( error =>{
    console.log(`Error fetching users: ${error.message}`)
    res.redirect('/');
  });
}

exports.new = (req, res) => {
  res.render('users/new', {title: "New User"});
}
exports.create = (req, res) => {
  var userParams = {name: {first: req.body.first, last: req.body.last}, email: req.body.email, password: req.body.password, zipCode: req.body.zipCode};
  User.create(userParams)
  .then(user => {
    res.redirect('/users');
  })
  .catch(error => {
    console.log(`Error fetching users: ${error.message}`)
    res.redirect('/');
  })
}

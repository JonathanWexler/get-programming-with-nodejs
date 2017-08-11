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
  var userParams = getUserParams(req.body);
  User.create(userParams)
  .then(user => {
    res.redirect('/users');
  })
  .catch(error => {
    console.log(`Error fetching users: ${error.message}`)
    res.redirect('/');
  })
}

exports.show = (req, res) => {
  var userId = req.params.id;
  User.findById(userId)
  .then(user => {
    res.render('users/show', {user: user, title: "User Show"});
  })
  .catch(error => {
    console.log(`Error fetching user by ID: ${error.message}`)
    res.redirect('/');
  })
}

exports.edit = (req, res) => {
  var userId = req.params.id;
  User.findById(userId)
  .then(user => {
    res.render('users/edit', {user: user, title: "User Show"});
  })
  .catch(error => {
    console.log(`Error fetching user by ID: ${error.message}`)
    res.redirect('/');
  })
}

exports.update = (req, res) => {
  var userId = req.params.id;
  var userParams = getUserParams(req.body);
  User.findByIdAndUpdate(userId, { $set: userParams })
  .then(user => {
    res.redirect(`/users/${userId}`);
  })
  .catch(error => {
    console.log(`Error updating user by ID: ${error.message}`)
    res.redirect('/');
  })
}

exports.delete = (req, res) => {
  var userId = req.params.id;
  User.findByIdAndRemove(userId)
  .then(user => {
    console.log(user);
    res.redirect('/users');
  })
  .catch(error => {
    console.log(`Error deleting user by ID: ${error.message}`)
    res.redirect('/');
  })
}

function getUserParams(body) {
  return {name: {first: body.first, last: body.last}, email: body.email, password: body.password, zipCode: body.zipCode};
}

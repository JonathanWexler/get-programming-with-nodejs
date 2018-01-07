'use strict';

const User = require('../models/user');

module.exports = {
  index: (req, res, next) => {
    User.find()
    .then(users => {
      res.locals.users = users;
      next();
    })
    .catch( error =>{
      console.log(`Error fetching users: ${error.message}`);
      next(error);
    });
  },
  indexView: (req, res) => {
    res.render('users/index');
  },

  new: (req, res) => {
    res.render('users/new');
  },

  create: (req, res, next) => {

    var userParams = {name: {first: req.body.first, last: req.body.last}, email: req.body.email, password: req.body.password, zipCode: req.body.zipCode};
    User.create(userParams)
    .then(user => {
      res.locals.redirect = '/users';
      req.flash('success', `${user.fullName}'s account created successfully!`);
      res.locals.user = user;
      next();
    })
    .catch(error => {
      console.log(`Error saving user: ${error.message}`);
      res.locals.redirect = '/users/new';
      req.flash('error', `Failed to create user account because: ${error.message}.`);
      next();
    });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },

  show: (req, res, next) => {
    var userId = req.params.id;
    User.findById(userId)
    .then(user => {
      res.locals.user = user;
      next();
    })
    .catch(error => {
      console.log(`Error fetching user by ID: ${error.message}`)
      next(error);
    });
  },

  showView: (req, res) => {
    res.render('users/show');
  },

  edit: (req, res, next) => {
    var userId = req.params.id;
    User.findById(userId)
    .then(user => {
      res.render('users/edit', {user: user});
    })
    .catch(error => {
      console.log(`Error fetching user by ID: ${error.message}`);
      next(error);
    });
  },

  update: (req, res, next) => {
    var userId = req.params.id,
    userParams = {name: {first: req.body.first, last: req.body.last}, email: req.body.email, password: req.body.password, zipCode: req.body.zipCode};

    User.findByIdAndUpdate(userId, { $set: userParams })
    .then(user => {
      res.locals.redirect = `/users/${userId}`;
      req.flash('success', `${user.fullName}'s account updated successfully!`);
      res.locals.user = user;
      next();
    })
    .catch(error => {
      console.log(`Error updating user by ID: ${error.message}`);
      req.flash('error', `Failed to update user account because: ${error.message}.`);
      res.locals.redirect = `/users/${userId}/edit`;
      next();
    });
  },

  delete: (req, res, next) => {
    var userId = req.params.id;
    User.findByIdAndRemove(userId)
    .then(user => {
      res.locals.redirect = '/users';
      req.flash('success', `${user.fullName}'s account deleted successfully!`);
      next();
    })
    .catch(error => {
      console.log(`Error deleting user by ID: ${error.message}`);
      next();
    });
  }

};

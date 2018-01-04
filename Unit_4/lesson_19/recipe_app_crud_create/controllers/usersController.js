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
    console.log(req.body)

    var userParams = {name: {first: req.body.first, last: req.body.last}, email: req.body.email, password: req.body.password, zipCode: req.body.zipCode};
    User.create(userParams)
    .then(user => {
      res.locals.user = user;
      next();
    })
    .catch(error => {
      console.log(`Error saving user: ${error.message}`)
      next(error);
    });
  },

  createView: (req, res) => {
    if (res.locals.user) res.redirect('/users');
    else res.redirect('users/new');
  }

};

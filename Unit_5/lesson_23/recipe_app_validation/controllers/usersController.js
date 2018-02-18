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
    if (req.skip) next();
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
  },

  login: (req, res) => {
    res.render('users/login');
  },

  authenticate: (req, res, next) => {
    User.findOne({email: req.body.email})
    .then(user => {
      if (user !== null) {
        user.passwordComparison(req.body.password)
        .then(passwordsMatch => {
          if (passwordsMatch) {
            res.locals.redirect = `/users/${user._id}`;
            req.flash('success', `${user.fullName}'s logged in successfully!`);
            res.locals.user = user;
          } else {
            req.flash('error', 'Your account or password is incorrect. Please try again or contact your system administrator!');
            res.locals.redirect = '/users/login';
          }
          next();
        });
      } else {
        req.flash('error', 'Failed to log in user account: User account not found.');
        res.locals.redirect = '/users/login';
        next();
      }
    })
    .catch(error => {
      console.log(`Error logging in user: ${error.message}`);
      next(error);
    });
  },

  validate: (req, res, next) => {
    req.sanitizeBody('email').normalizeEmail({all_lowercase: true, }).trim();
    req.check('email', 'Email is invalid').isEmail();
    req.check('zipCode', 'Zip code is invalid').notEmpty().isInt().isLength({min: 5, max: 5}).equals(req.body.zipCode);
    req.check('password', 'Password cannot be empty').notEmpty();

    req.getValidationResult().then((errors) => {
      if (!errors.isEmpty()) {
        let messages = errors.array().map(error => error.msg);
        req.skip = true;
        req.flash('error', messages.join(' and '));
        res.locals.redirect = '/users/new';
        next();
      } else {
        next();
      }
    });
  }

};

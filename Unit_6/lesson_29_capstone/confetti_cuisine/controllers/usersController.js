'use strict';

const User = require('../models/user'),
  passport = require('passport');

module.exports = {
  index: (req, res, next) => {
    User.find()
      .then(users => {
        res.locals.users = users;
        next();
      })
      .catch(error => {
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

    let newUser = new User(getUserParams(req.body));

    User.register(newUser, req.body.password, (e, user) => {
      if (user) {
        req.flash('success', `${user.fullName}'s account created successfully!`);
        res.locals.redirect = '/users';
        next();
      } else {
        req.flash('error', `Failed to create user account because: ${e.message}.`);
        res.locals.redirect = '/users/new';
        next();
      }
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
        res.render('users/edit', {
          user: user
        });
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },

  update: (req, res, next) => {
    var userId = req.params.id,
      userParams = getUserParams(req.body);

    User.findByIdAndUpdate(userId, {
        $set: userParams
      })
      .then(user => {
        res.locals.redirect = `/users/${userId}`;
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.log(`Error updating user by ID: ${error.message}`);
        next(error);
      });
  },

  delete: (req, res, next) => {
    var userId = req.params.id;
    User.findByIdAndRemove(userId)
      .then(user => {
        res.locals.redirect = '/users';
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

  authenticate: passport.authenticate('local', {
    failureRedirect: '/users/login',
    failureFlash: "Failed to login.",
    successRedirect: `/`,
    successFlash: "Logged in!"
  }),

  validate: (req, res, next) => {
    req.sanitizeBody('email').normalizeEmail({
      all_lowercase: true,
    }).trim();
    req.check('email', 'Email is invalid').isEmail();
    req.check('zipCode', 'Zip code is invalid').notEmpty().isInt().isLength({
      min: 5,
      max: 5
    }).equals(req.body.zipCode);
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
  },

  logout: (req, res, next) => {
    req.logout();
    req.flash('success', "You have been logged out!");
    res.locals.redirect = '/';
    next();
  }

};

function getUserParams(body) {
  return {
    name: {
      first: body.first,
      last: body.last
    },
    email: body.email,
    password: body.password,
    zipCode: body.zipCode
  };
}
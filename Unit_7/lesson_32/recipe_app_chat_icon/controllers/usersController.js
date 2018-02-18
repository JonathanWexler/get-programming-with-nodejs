'use strict';

const User = require('../models/user'),
  passport = require('passport'),
  jsonWebToken = require('jsonwebtoken'),
  token = process.env.TOKEN || 'recipeT0k3n';

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

    let newUser = new User({
      name: {
        first: req.body.first,
        last: req.body.last
      },
      email: req.body.email,
      password: req.body.password,
      zipCode: req.body.zipCode
    });

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
      userParams = {
        name: {
          first: req.body.first,
          last: req.body.last
        },
        email: req.body.email,
        password: req.body.password,
        zipCode: req.body.zipCode
      };

    User.findByIdAndUpdate(userId, {
        $set: userParams
      })
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
  },

  verifyToken: (req, res, next) => {
    let token = req.query.apiToken;
    if (token) {
      User.findOne({
          apiToken: req.params.apiToken
        })
        .then(user => {
          if (user) next();
          else res.json({
            error: true,
            message: "Invalid API token."
          });
        })
        .catch(errors => res.json({
          error: true,
          message: "Invalid API token."
        }));
    } else {
      res.json({
        error: true,
        message: "API token required."
      });
    }
  },

  apiAuthenticate: (req, res, next) => {
    passport.authenticate('local', (errors, user) => {
      if (user) {
        let signedToken = jsonWebToken.sign({
          data: user._id,
          exp: new Date().setDate(new Date().getDate() + 1)
        }, 'secret_encoding_passphrase');
        res.json({
          success: true,
          token: signedToken
        });
      } else res.json({
        error: "true",
        message: "Could not authenticate user."
      });
    })(req, res, next);
  },

  verifyJWT: (req, res, next) => {
    let token = req.headers['token'];
    if (token) {
      jsonWebToken.verify(token, 'secret_encoding_passphrase', (errors, payload) => {
        if (payload) {
          User.findById(payload.data)
            .then(user => {
              console.log(user)
              if (user) next();
              else res.status(403).json({
                error: true,
                message: "No User account found."
              });
            });
        } else {
          res.status(401).json({
            error: true,
            message: "Cannot verify API token."
          });
        }
      });
    } else {
      res.status(401).json({
        error: true,
        message: "Provide Token"
      });
    }
  }

};
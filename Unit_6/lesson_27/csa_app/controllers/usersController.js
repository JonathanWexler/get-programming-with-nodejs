// Giving access to the user model
const User = require('../models/user');
const passport = require('passport');

// Setting up callback for users index page
exports.index = (req, res) => {
  User.find({})
  .then(users => {
    res.json({users: users});
  })
  .catch( error =>{
    console.log(`Error fetching users: ${error.message}`)
    res.redirect('/');
  });
}

// Create action
exports.new = (req, res) => {
  res.render('users/new');
}
exports.create = (req, res) => {
  var userParams = getUserParams(req.body);
  var u = new User(userParams);
  User.register(u, req.body.password, function(e, user){
    if (user) {
      req.flash('success', `${user.fullName}'s account created successfully!` )
      res.redirect('/users');
    } else {
      req.flash('error', `Failed to create user account because: ${e.message}.` )
      res.redirect('/');
    }
  });

}

// User.create(userParams)
// .then(user => {
//   res.redirect('/users');
// })
// .catch(error => {
//   console.log(`Error fetching users: ${error.message}`)
//   res.redirect('/');
// })

// exports.create = (req, res) => {
//   var userParams = getUserParams(req.body);
//   User.create(userParams)
//   .then(user => {
//     res.redirect('/users');
//   })
//   .catch(error => {
//     console.log(`Error fetching users: ${error.message}`)
//     res.redirect('/');
//   })
// }

// Read action
exports.show = (req, res) => {
  var userId = req.params.id;
  User.findById(userId)
  .then(user => {
    res.render('users/show', {user: user});
  })
  .catch(error => {
    console.log(`Error fetching user by ID: ${error.message}`)
    res.redirect('/');
  })
}

// Update action
exports.edit = (req, res) => {
  var userId = req.params.id;
  User.findById(userId)
  .then(user => {
    res.render('users/edit', {user: user});
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

// Delete action
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
exports.login = (req, res) => {
  res.render('users/login');
}

exports.logout = (req,res) =>{
  req.logout();
  req.flash('success', "You have been logged out!");
  res.redirect('/');
}

exports.authenticate = passport.authenticate('local', {
  failureRedirect: '/users/login',
  failureFlash: "Failed to login",
  successRedirect: '/',
  successFlash: "Logged in!"
});
// let user = new User(userParams());
// User.register
// req.flash('success', "Login successful");
// res.redirect('/users/login');

// jon@jonwexler.com

exports.validate = (req, res, next) => {
  req.sanitizeBody('first').trim();
  req.check('first', 'First name cannot be empty').notEmpty();
  req.sanitizeBody('last').trim();
  req.check('last', 'Last name cannot be empty').notEmpty();
  req.sanitizeBody('email').normalizeEmail({all_lowercase: true, }).trim();
  req.check('email', 'Email is invalid').isEmail();
  req.check('zipCode', 'Zip code is invalid').notEmpty().isInt().isLength({min: 5, max: 5}).equals(req.body.zipCode);
  req.check('password', 'Password cannot be empty').notEmpty();

  req.getValidationResult().then((errors) => {

    if (!errors.isEmpty()) {
      var messages = errors.array().map(e => e.msg);
      req.flash('error', messages.join(' and '));
      res.render('users/new', Object.assign(req.body, {flashMessages: req.flash()}))
      return;
    } else {
      next();
    }
  });
}

function getUserParams(body) {
  return {name: {first: body.first, last: body.last}, email: body.email, password: body.password, zipCode: body.zipCode};
}

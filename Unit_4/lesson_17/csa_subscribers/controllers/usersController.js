// Gioving access to the user model
const User = require('../models/user');

// Setting up callback for users index page
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

// Create action
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

// Read action
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

// Update action
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

function getUserParams(body) {
  return {name: {first: body.first, last: body.last}, email: body.email, password: body.password, zipCode: body.zipCode};
}


// Login form

exports.login = (req, res) => {
  res.render('users/login', {title: "Login"});
}

// exports.authenticate = (req, res) => {
//   User.findOne({email: req.body.email})
//   .then(user => {
//     if (user.password == req.body.password){
//       res.redirect(`/users/${user._id}`);
//     } else {
//       res.redirect('/users/login');
//     }
//   })
//   .catch(e=> {
//     console.log(`Error logging in user: ${e.message}`);
//     res.redirect('/users/login');
//   });
// }

exports.authenticate = (req, res) => {
  var user;
  User.findOne({email: req.body.email})
  .then(u => {
    user = u;
    return user.passwordComparison(req.body.password);
  })
  .then(passwordsMatch =>{
    if (passwordsMatch) {
      res.redirect(`/users/${user._id}`);
    } else {
      throw new Error("Passwords do not match");
    }
  })
  .catch(e=> {
    console.log(`Error logging in user: ${e.message}`);
    res.redirect('/users/login');
  });
}


// User.findOne({email: 'j@toop.com'}).then(u => u.passwordsMatch('123123')).then(res => console.log(res));

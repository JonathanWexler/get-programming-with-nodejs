// Giving access to the user model
const User = require('../../models/user');
const passport = require('passport');
const jsonWebToken = require('jsonwebtoken');
// const passport = require('passport');


// const token = process.env.TOKEN || 'farmers123';

exports.verifyToken = (req, res, next) => {
  var token = req.query.apiToken;
  if (token) {
    User.findOne({apiToken: req.params.apiToken})
    .then(user => {
      if(user) next();
      else res.json({error: true, message: "Invalid API token."});
    })
    .catch(errors => res.json({error: true, message: "Invalid API token."}));
  } else {
    res.json({error: true, message: "API token required."});
  }
}


exports.login = (req, res, next) => {
  passport.authenticate('local', (errors, user) => {
    if (user){
      var signedToken = jsonWebToken.sign({
        data: user._id,
        exp: new Date().setDate(new Date().getDate() + 1)
      }, 'secret_encoding_passphrase');
      res.json({success: true, token: signedToken});
    }
    else res.json({error: "true", message: "Could not authenticate user."});
  })(req, res, next);
}

exports.verifyJWT = (req, res, next) => {
  var token = req.headers['token'];
  if (token) {
    jsonWebToken.verify(token, 'secret_encoding_passphrase', (errors, payload)=> {
      if(payload){
        User.findById(payload.data)
        .then(user => {
          if (user) next();
          else res.status(403).json({error: true, message: "No User account found."})
        })
      }
      else res.status(401).json({error: true, message: "Cannot verify API token."})
      next();
    })
  } else {
    res.status(401).json({error: true, message: "Provide Token"})
  }
}

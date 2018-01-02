'use strict';

// exports.logErrors = (error, req, res, next) => {
//   console.error(error.stack);
//   next(error);
// }

// exports.respondNoResourceFound = (req, res) =>{
//   res.status(404);
//   res.send('404 | The page does not exist!');
// }

exports.respondNoResourceFound = (req, res) =>{
  res.status(404);
  res.sendFile('./public/404.html', {root: './'});
}

exports.respondInternalError = (errors, req, res) => {
  console.log(`ERROR occurred: ${errors.stack}`)
  res.status(500);
  res.send('500 | Sorry, our application is experiencing a problem!');
}

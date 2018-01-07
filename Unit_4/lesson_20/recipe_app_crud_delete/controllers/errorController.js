'use strict';

module.exports = {
  pageNotFoundError: (req, res) => {
    res.status(404);
    res.send('404 | The course or recipe  you are looking for may not exist!');
  },

  internalServerError: (errors, req, res, next) => {
    console.log(`ERROR occurred: ${errors.stack}`)
    res.status(500);
    res.send('500 | Sorry, our application is taking a nap!');
  }
};

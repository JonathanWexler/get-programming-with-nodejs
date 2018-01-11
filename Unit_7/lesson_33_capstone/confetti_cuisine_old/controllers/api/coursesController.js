// Giving access to the course model
const Course = require('../../models/course');
// const User = require('../models/user');

// Setting up callback for courses index page
exports.index = (req, res) => {
  Course.find({})
  .then(courses => {
    res.json(courses)
  })
  .catch( error =>{
    console.log(`Error fetching courses in API: ${error.message}`)
    res.status(500);
    res.json({error: "Internal Error"})
  });
}

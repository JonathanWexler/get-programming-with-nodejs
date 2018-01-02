// Giving access to the course model
const Course = require('../../models/course');
const User = require('../../models/user');

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

exports.join = (req, res) => {
  var courseId = req.params.id,
  currentUser = req.user;

  if (currentUser) {
    User.findByIdAndUpdate(currentUser, { $addToSet: { courses: courseId } })
    .then(() => {
      res.json({'success': true, 'message': `${currentUser.fullName} successfully joined the group.`});
    })
    .catch(error => {
      res.json({'error': true, 'message': error.message});
    })
  } else {
    res.json({'error': true, 'message': "User must log in."});
  }
}

// Giving access to the course model
const Course = require('../models/course');
const User = require('../models/user');

// Setting up callback for courses index page
exports.index = (req, res) => {
  Course.find({})
  .then(courses => {
    console.log(req.query.format)
    if (req.query.format && req.query.format === 'json') res.json(courses)
    else res.render('courses/index', {courses: courses})

  })
  .catch( error =>{
    console.log(`Error fetching courses: ${error.message}`)
    res.redirect('/');
  });
}

// Create action
exports.new = (req, res) => {
  res.render('courses/new');
}
exports.create = (req, res) => {
  var courseParams = getCourseParams(req.body);
  Course.create(courseParams)
  .then(course => {
    res.redirect('/courses');
  })
  .catch(error => {
    console.log(`Error fetching courses: ${error.message}`)
    res.redirect('/');
  })
}

// Read action
exports.show = (req, res) => {
  var courseId = req.params.id;
  Course.findById(courseId)
  .then(course => {
    res.render('courses/show', {course: course});
  })
  .catch(error => {
    console.log(`Error fetching course by ID: ${error.message}`)
    res.redirect('/');
  })
}

// Update action
exports.edit = (req, res) => {
  var courseId = req.params.id;
  Course.findById(courseId)
  .then(course => {
    res.render('courses/edit', {course: course});
  })
  .catch(error => {
    console.log(`Error fetching course by ID: ${error.message}`)
    res.redirect('/');
  })
}

exports.update = (req, res) => {
  var courseId = req.params.id;
  var courseParams = getCourseParams(req.body);
  Course.findByIdAndUpdate(courseId, { $set: courseParams })
  .then(course => {
    res.redirect(`/courses/${courseId}`);
  })
  .catch(error => {
    console.log(`Error updating course by ID: ${error.message}`)
    res.redirect('/');
  })
}

// Delete action
exports.delete = (req, res) => {
  var courseId = req.params.id;
  Course.findByIdAndRemove(courseId)
  .then(course => {
    console.log(course);
    res.redirect('/courses');
  })
  .catch(error => {
    console.log(`Error deleting course by ID: ${error.message}`)
    res.redirect('/');
  })
}

exports.enroll = (req, res) => {
  var courseId = req.params.id,
  currentUser = req.user;

  if (currentUser) {
    User.findByIdAndUpdate(currentUser, { $addToSet: { courses: courseId } })
    .then(() => {
      req.flash('success', `${currentUser.fullName} is successfully enrolled!` )
      res.redirect(`/courses/${courseId}`);
    })
    .catch(error => {
      req.flash('error', `Error enrolling.` )
      console.log(`Error enrolling ${currentUser._id} in ${courseId}: ${error.message}`)
      res.redirect('/');
    })
  } else {
    req.flash('error', `You must log in to enroll!` )
    res.redirect(`/users/login`);
  }
}

function getCourseParams(body) {
  return {name: body.name, description: body.description, maxStudents: parseInt(body.maxStudents), cost: parseInt(body.cost)};
}

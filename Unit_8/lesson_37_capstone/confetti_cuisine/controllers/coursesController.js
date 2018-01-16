'use strict';

const Course = require('../models/course'),
User = require('../models/user');

module.exports = {
  index: (req, res, next) => {
    Course.find()
    .then(courses => {
      res.locals.courses = courses;
      next();
    })
    .catch( error =>{
      console.log(`Error fetching courses: ${error.message}`);
      next(error);
    });
  },
  indexView: (req, res, next) => {
    res.render('courses/index');
  },

  new: (req, res) => {
    res.render('courses/new');
  },

  create: (req, res, next) => {
    var courseParams = getCourseParams(req.body);
    Course.create(courseParams)
    .then(course => {
      res.locals.redirect = '/courses';
      res.locals.course = course;
      next();
    })
    .catch(error => {
      console.log(`Error saving course: ${error.message}`)
      next(error);
    });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },

  show: (req, res, next) => {
    var courseId = req.params.id;
    Course.findById(courseId)
    .then(course => {
      res.locals.course = course;
      next();
    })
    .catch(error => {
      console.log(`Error fetching course by ID: ${error.message}`)
      next(error);
    });
  },

  showView: (req, res) => {
    res.render('courses/show');
  },

  edit: (req, res, next) => {
    var courseId = req.params.id;
    Course.findById(courseId)
    .then(course => {
      res.render('courses/edit', {course: course});
    })
    .catch(error => {
      console.log(`Error fetching course by ID: ${error.message}`);
      next(error);
    });
  },

  update: (req, res, next) => {
    var courseId = req.params.id,
    courseParams = getCourseParams(req.body);
    console.log("HERE")
    Course.findByIdAndUpdate(courseId, { $set: courseParams })
    .then(course => {
      console.log("HERE2")

      res.locals.redirect = `/courses/${courseId}`;
      res.locals.course = course;
      next();
    })
    .catch(error => {
      console.log("HERE3")

      console.log(`Error updating course by ID: ${error.message}`);
      next(error);
    });
  },

  delete: (req, res, next) => {
    var courseId = req.params.id;
    Course.findByIdAndRemove(courseId)
    .then(course => {
      res.locals.redirect = '/courses';
      next();
    })
    .catch(error => {
      console.log(`Error deleting course by ID: ${error.message}`);
      next();
    });
  },
  respondJSON: (req, res, next) => {
    res.json({status: 200, data: res.locals.courses});
  },
  errorJSON: (error, req, res, next) => {
    res.json({status: 500, message: `An error occurred: ${error.message}`});
  },
  join: (req, res, next) => {
    let courseId = req.params.id,
    currentUser = req.user;

    if (currentUser) {
      User.findByIdAndUpdate(currentUser, { $addToSet: { courses: courseId } })
      .then(() => {
        res.json({status: 200, success: true, message: `You joined course ${courseId}`});
      })
      .catch(error => {
        next(error);
      });
    } else {
      res.json({status: 401, success: false, message: `You must log in to enroll!`});
    }
  }
};

function getCourseParams(body) {
  return {title: body.title, description: body.description, maxStudents: body.maxStudents, cost: body.cost};
}

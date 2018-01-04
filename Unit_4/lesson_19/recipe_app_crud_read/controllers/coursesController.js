'use strict';

const Course = require('../models/course');

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
    var courseParams = {name: req.body.name, email: req.body.email, zipCode: req.body.zipCode};
    Course.create(courseParams)
    .then(course => {
      res.locals.course = course;
      next();
    })
    .catch(error => {
      console.log(`Error saving course: ${error.message}`)
      next(error);
    });
  },

  createView: (req, res) => {
    if (res.locals.course) res.redirect('/courses');
    else res.redirect('courses/new');
  }
};

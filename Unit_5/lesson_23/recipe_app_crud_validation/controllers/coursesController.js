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
    var courseParams = {title: req.body.title, description: req.body.description, items: [req.body.items.split(",")], zipCode: req.body.zipCode};
    Course.create(courseParams)
    .then(course => {
      res.locals.redirect = '/courses';
      req.flash('success', `${course.title}'s account created successfully!`);
      res.locals.course = course;
      next();
    })
    .catch(error => {
      console.log(`Error saving course: ${error.message}`);
      req.flash('error', `Failed to create course because: ${error.message}.`);
      res.locals.redirect = `/courses/new`;
      next();
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
    courseParams = {title: req.body.title, description: req.body.description, items: [req.body.items.split(",")], zipCode: req.body.zipCode};

    Course.findByIdAndUpdate(courseId, { $set: courseParams })
    .then(course => {
      res.locals.redirect = `/courses/${courseId}`;
      req.flash('success', `${course.title}'s account updated successfully!`);
      res.locals.course = course;
      next();
    })
    .catch(error => {
      console.log(`Error updating course by ID: ${error.message}`);
      req.flash('error', `Failed to update course because: ${error.message}.`);
      res.locals.redirect = `/courses/${courseId}/edit`;
      next();
    });
  },

  delete: (req, res, next) => {
    var courseId = req.params.id;
    Course.findByIdAndRemove(courseId)
    .then(course => {
      res.locals.redirect = '/courses';
      req.flash('success', `${course.title} deleted successfully!`);
      next();
    })
    .catch(error => {
      console.log(`Error deleting course by ID: ${error.message}`);
      next();
    });
  }
};

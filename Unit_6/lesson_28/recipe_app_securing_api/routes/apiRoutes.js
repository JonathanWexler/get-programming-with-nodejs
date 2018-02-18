'use strict';

const router = require('express').Router(),
    coursesController = require('../controllers/coursesController'),
    usersController = require('../controllers/usersController');

router.get('/courses', usersController.verifyToken, coursesController.index, coursesController.respondJSON);
router.get('/courses/:id/join', coursesController.join);

module.exports = router;
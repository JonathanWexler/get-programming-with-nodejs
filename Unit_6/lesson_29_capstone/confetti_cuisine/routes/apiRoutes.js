'use strict';

const router = require('express').Router(),
coursesController = require('../controllers/coursesController');

router.get('/courses', coursesController.index, coursesController.respondJSON );
router.get('/courses/:id/join', coursesController.join);
router.use('/', coursesController.errorJSON);

module.exports = router;

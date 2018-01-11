'use strict';

const router = require('express').Router(),
coursesController = require('../controllers/coursesController'),
usersController = require('../controllers/usersController');

router.post('/login', usersController.apiAuthenticate );
router.use(usersController.verifyJWT);

router.get('/courses', coursesController.index, coursesController.respondJSON );
router.get('/courses/:id/join', coursesController.join);

module.exports = router;

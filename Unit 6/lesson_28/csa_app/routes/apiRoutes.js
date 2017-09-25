const router = require('express').Router();
const coursesController = require('../controllers/api/coursesController');
const usersController = require('../controllers/api/usersController');

const token = process.env.TOKEN || 'farmers123';


router.get('/courses', usersController.verifyToken, coursesController.index );
router.get('/courses/:id/join', coursesController.join );

console.log(token);

module.exports = router;

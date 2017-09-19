const router = require('express').Router();
const coursesController = require('../controllers/coursesController');

// subscribers ROUTES
// Courses ROUTES
router.get('/courses', coursesController.index );

module.exports = router;

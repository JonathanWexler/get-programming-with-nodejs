const router = require('express').Router();
const coursesController = require('../controllers/api/coursesController');

router.get('/courses', coursesController.index );

module.exports = router;

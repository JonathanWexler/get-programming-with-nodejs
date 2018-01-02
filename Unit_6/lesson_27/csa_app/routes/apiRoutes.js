const router = require('express').Router();
const coursesController = require('../controllers/api/coursesController');

router.get('/courses', coursesController.index );
router.get('/courses/:id/join', coursesController.join );

module.exports = router;

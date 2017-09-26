const router = require('express').Router();
const coursesController = require('../controllers/api/coursesController');
const usersController = require('../controllers/api/usersController');

router.post('/login', usersController.login );

router.use(usersController.verifyJWT);

router.get('/courses', coursesController.index );
router.get('/courses/:id/join', coursesController.join );

module.exports = router;

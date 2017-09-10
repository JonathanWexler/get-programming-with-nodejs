const router = require('express').Router();
const coursesController = require('../controllers/coursesController');

// subscribers ROUTES
// Courses ROUTES
router.get('/', coursesController.index );
router.get('/new', coursesController.new );
router.post('/create', coursesController.create );
router.get('/:id', coursesController.show );
router.get('/:id/edit', coursesController.edit );
router.put('/:id/update', coursesController.update );
router.delete('/:id/delete', coursesController.delete );

module.exports = router;

const router = require('express').Router();
const subscribersController = require('../controllers/subscribersController');

// subscribers ROUTES
router.get('/', subscribersController.index );
router.get('/new', subscribersController.new );
router.post('/create', subscribersController.create );
router.get('/:id', subscribersController.show );
router.get('/:id/edit', subscribersController.edit );
router.put('/:id/update', subscribersController.update );
router.delete('/:id/delete', subscribersController.delete );

router.get('/contact', subscribersController.new );

module.exports = router;

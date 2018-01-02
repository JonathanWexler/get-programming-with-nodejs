const router = require('express').Router();

const userRoutes = require('./userRoutes');
const subscriberRoutes = require('./subscriberRoutes');
const courseRoutes = require('./courseRoutes');
const errorRoutes = require('./errorRoutes');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes );
router.use('/', errorRoutes );
router.use('/users', userRoutes );
router.use('/subscribers', subscriberRoutes );
router.use('/courses', courseRoutes );

module.exports = router;

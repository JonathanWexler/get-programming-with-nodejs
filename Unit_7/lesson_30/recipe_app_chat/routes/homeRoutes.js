'use strict';

const router = require('express').Router(),
    homeController = require('../controllers/homeController');

router.get('/', homeController.index);
router.get('/chat', homeController.chat);
router.get('/contact', homeController.showSignUp);
router.post('/sign-up', homeController.postedSignUpForm);
router.post('/contact', homeController.postedContactForm);


module.exports = router;
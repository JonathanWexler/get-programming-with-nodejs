'use strict';

const router = require('express').Router(),
    homeController = require('../controllers/homeController'),
    subscribersController = require('../controllers/subscribersController');

router.get('/', homeController.index);
router.get('/contact', homeController.showSignUp);
router.post('/sign-up', homeController.postedSignUpForm);
router.post('/contact', homeController.postedContactForm);
router.get('/chat', homeController.chat);

router.get('/contact', subscribersController.new);
router.post('/subscribe', subscribersController.create, subscribersController.redirectView);
module.exports = router;
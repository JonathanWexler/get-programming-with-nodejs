'use strict';

const port = 3000,
  http = require('http'),
  httpStatus = require('http-status-codes'),
  router = require('./router'),
  fs = require('fs'),
  contentTypes = require('./content-types'),
  utils = require('./utils');

// VIEWS
router.get('/', (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.html);
  utils.getFile('views/index.html', res);
});

router.get('/courses.html', (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.html);
  utils.getFile('views/courses.html', res);
});

router.get('/contact.html', (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.html);
  utils.getFile('views/contact.html', res);
});

router.post('/', (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.html);
  utils.getFile('views/thankyou.html', res);
});

// ASSETS
router.get('/graph.png', (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.png);
  utils.getFile('public/images/graph.png', res);
});
router.get('/people.jpg', (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.jpg);
  utils.getFile('public/images/people.jpg', res);
});
router.get('/product.jpg', (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.jpg);
  utils.getFile('public/images/product.jpg', res);
});
router.get('/confetti_cuisine.css', (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.css);
  utils.getFile('public/css/confetti_cuisine.css', res);
});
router.get('/bootstrap.css', (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.css);
  utils.getFile('public/css/bootstrap.css', res);
});
router.get('/confetti_cuisine.js', (req, res) => {
  res.writeHead(httpStatus.OK, jsContentType);
  utils.getFile('public/js/confetti_cuisine.js', res);
});

// START SERVER
http.createServer(router.handle).listen(port);
console.log(`The server has started and is listening on port number: ${port}`);
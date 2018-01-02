'use strict';

const http = require('http'),
  router = require('./router'),
  fs = require('fs');


http.createServer(router.handle).listen(3000);
console.log('Server running at http://localhost:3000');

// VIEWS
router.get('/', (req, res) => {
  res.writeHead(200, {"Content-Type": "text/html"});
  getFile('views/index.html', res);
});

router.get('/courses.html', (req, res) => {
  res.writeHead(200, {"Content-Type": "text/html"});
  getFile('views/courses.html', res);
});

router.get('/contact.html', (req, res) => {
  res.writeHead(200, {"Content-Type": "text/html"});
  getFile('views/contact.html', res);
});

router.post('/', (req, res) => {
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.end("Thank you for submitting");
});

// ASSETS
router.get('/graph.png', (req, res) => {
  res.writeHead(200, {"Content-Type": "image/png"});
  getFile('public/images/graph.png', res);
});
router.get('/people.jpg', (req, res) => {
  res.writeHead(200, {"Content-Type": "image/jpg"});
  getFile('public/images/people.jpg', res);
});
router.get('/product.jpg', (req, res) => {
  res.writeHead(200, {"Content-Type": "image/jpg"});
  getFile('public/images/product.jpg', res);
});
router.get('/confetti_cuisine.css', (req, res) => {
  res.writeHead(200, {"Content-Type": "text/css"});
  getFile('public/css/confetti_cuisine.css', res);
});
router.get('/bootstrap.css', (req, res) => {
  res.writeHead(200, {"Content-Type": "text/css"});
  getFile('public/css/bootstrap.css', res);
});
router.get('/confetti_cuisine.js', (req, res) => {
  res.writeHead(200, {"Content-Type": "text/js"});
  getFile('public/js/confetti_cuisine.js', res);
});

// File Loading
let getFile = (file, res) => {
  fs.readFile(`./${file}`, (errors, data) => {
    if (errors) {
      res.writeHead(500, {"Content-Type": "text/plain"});
      res.end("Internal Error");
    }
    res.end(data);
  });
}

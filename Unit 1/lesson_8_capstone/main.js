// funder_dome app for crowd sourced fund raising
const http = require('http');
const router = require('./router');
const fs = require('fs');


http.createServer(router.handle).listen(3000);
console.log('Server running at http://localhost:3000');

// VIEWS
router.get('/', (req, res) => {
  res.writeHead(200, {"Content-Type": "text/html"});
  getFile('views/index.html', res);
});

router.get('/product.html', (req, res) => {
  res.writeHead(200, {"Content-Type": "text/html"});
  getFile('views/product.html', res);
});

router.get('/fund.html', (req, res) => {
  res.writeHead(200, {"Content-Type": "text/html"});
  getFile('views/fund.html', res);
});

router.post('/', (req, res) => {
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.end("Thank you for funding");
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
router.get('/funder_dome.css', (req, res) => {
  res.writeHead(200, {"Content-Type": "text/css"});
  getFile('public/css/funder_dome.css', res);
});
router.get('/funder_dome.js', (req, res) => {
  res.writeHead(200, {"Content-Type": "text/js"});
  getFile('public/js/funder_dome.js', res);
});

// File Loading
let getFile = (file, res) => {
  let contents = "";
  fs.readFile(`./${file}`, (errors, data) => {
    if (errors) {
      res.writeHead(500, {"Content-Type": "text/plain"});
      res.end("Internal Error");
    }
    res.end(data);
  });
}

const http = require('http');

let routes = {
  'GET': {
    '/index.html': (req, res) => {
      res.writeHead(200, {"Content-Type": "text/plain"})
      res.end("Welcome to the Index Page!")
    }
  },
  'POST': {

  }
}

exports.handle = (req, res) =>{
  try {
    routes[req.method][req.url](req, res);
  } catch (e) {
    console.log('error: ' + e);
  }
}

exports.get = (url, action) =>{
  routes['GET'][url] = action;
}
exports.post = (url, action) =>{
  routes['POST'][url] = action;
}

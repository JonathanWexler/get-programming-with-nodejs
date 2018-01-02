'strict mode';

var routes = {
  'GET': {},
  'POST': {}
}
exports.handle = (req, res) =>{
  try {
    routes[req.method][req.url](req, res);
  } catch (e) {
    res.writeHead(404, {"Content-Type": "text/plain"});
    res.end("Cannot find your page!");
  }
}
exports.get = (url, action) =>{
  routes['GET'][url] = action;
}
exports.post = (url, action) =>{
  routes['POST'][url] = action;
}

const http = require('http');
const fs = require('fs');

http.createServer((req,res) => {
  let url = req.url;
  if (url.indexOf('.html') !== -1){
    res.writeHead(200, {'Content-Type': 'text/html'});
    readFile(`./views${url}`, res);
  } else if (url.indexOf('.js') !== -1) {
    res.writeHead(200, {'Content-Type': 'text/javascript'});
    readFile(`./public/js${url}`, res);
  } else if (url.indexOf('.css') !== -1){
    res.writeHead(200, {'Content-Type': 'text/css'});
    readFile(`./public/css${url}`, res);
  } else if (url.indexOf('.png') !== -1){
    res.writeHead(200, {'Content-Type': 'image/png'});
    readFile(`./public/images${url}`, res);
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write("File Not Found!");
    res.end();
  }
}).listen(3000);
console.log("Server running at http://localhost:3000");
function readFile(file_path, res){
  fs.readFile(file_path, (errors, data) =>{
    if (errors) console.log(errors);
    res.write(data);
    res.end();
  }); }

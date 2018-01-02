'strict mode';

const http = require('http'),
  router = require('./router'),
  fs = require('fs');

http.createServer(router.handle).listen(3000);
console.log('Server running at http://localhost:3000');

router.get('/', (req, res)=>{
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.end("INDEX");
});

router.get('/index.html', (req, res)=>{
  res.writeHead(200, {"Content-Type": "text/html"});
  customReadFile('views/index.html', res);
});

router.post('/', (req, res)=>{
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.end("POSTED");
});

function customReadFile(file, res) {
  let contents = "";
  fs.readFile(`./${file}`, (errors, data) => {
    if (errors) {
      console.log("Error reading the file...");
    }
    res.end(data);
  });
}

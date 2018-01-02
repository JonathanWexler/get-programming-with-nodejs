'strict mode';

const express = require('express'),
 app = express(),
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', (req, res) =>{
  console.log(req.body);
  console.log(req.query);
})

app.use((req, res, next) => {
  console.log(`request made to: ${req.url}`);
  next();
});

app.get('/items/:vegetable', (req, res) => {
  res.send(req.params.vegetable);
});

app.listen(3000, function () {
   console.log("Server running at http://localhost:3000");
});

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const homeController = require('./controllers/homeController');

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

app.get('/items/:vegetable', homeController.send_req_param);

app.listen(3000, function () {
   console.log("Server running at http://localhost:3000");
});

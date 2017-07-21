const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();

let homeController = require('./controllers/homeController');

app.use(express.static(`${__dirname}/public`));

app.set('view engine', 'ejs');
app.use(layouts);

app.use(homeController.log_request_paths);

app.get('/items/:vegetable', homeController.send_req_param);

app.get('/name/:myName', homeController.respond_with_name);

app.use((req, res) => {
  res.status(404);
  res.sendFile(`${__dirname}/public/404.html`);
});

app.listen(3000, () => {
  console.log("Server running");
});

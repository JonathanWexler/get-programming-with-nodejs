const express = require('express');
const app = express();
let homeController = require('./controllers/homeController');


app.use(homeController.log_request_paths);

app.get('/items/:vegetable', homeController.send_req_param);

app.listen(3000, () => {
  console.log("Server running");
});

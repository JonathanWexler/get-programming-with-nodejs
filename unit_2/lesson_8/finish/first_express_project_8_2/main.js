"use strict";

const port = 3000,
  express = require("express"),
  app = express();
app
  .get("/", (req, res) => {
    res.send("Hello, Universe!");
  })
  .listen(port, () => {
    console.log(`The Express.js server has started and is listening on port number: ${port}`);
  });

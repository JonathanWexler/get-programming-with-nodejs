const express = require('express');
const app = express();

app.get('/', (req, res) => {
   res.send('Hello, Universe!');
}).listen(3000, function () {
   console.log("Server running at http://localhost:3000");
});

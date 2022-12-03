//Import express.js module and create its variable.
const express = require("express");
const app = express();

//Router to handle the incoming request.
app.get("/", (req, res, next) => {
  const shell = require("shelljs");
  shell.exec(`python ./drowsiness_detection.py`);
});

//Creates the server on default port 8000 and can be accessed through localhost:8000
const port = 8000;
app.listen(port, () => console.log(`Server connected to ${port}`));

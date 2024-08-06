/* //todo
    01.create new famous ✅
    02.get all famous ✅
    03.get specific famous ✅
    04.update famous ✅
    05.query famous ✅
    06.delete famous✅
*/

//modules
const express = require("express");
const famousRouter = require("../src/routers/famous");
const queryRouter = require("./routers/query");
const cors = require("cors");

//variables
const app = express();

//static

//enable CORS
app.use(cors());

app.use(express.static("./public"));
// Route to serve index.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Route to serve style.css
app.get("/style.css", (req, res) => {
  res.sendFile(__dirname + "/public/style.css");
});

// Route to serve script.js
app.get("/script.js", (req, res) => {
  res.sendFile(__dirname + "/public/script.js");
});

//parse html
app.use(express.urlencoded({ extended: false }));

//parse json
app.use(express.json());

//api/famous
app.use("/api/famous", famousRouter);

//api/v1/query
app.use("/api/v1/query", queryRouter);

//for server
module.exports = app;

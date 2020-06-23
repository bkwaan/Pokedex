const express = require('express');
const connectDB = require('./config/db');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
//Connect DB
connectDB();

//MiddleWare
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());


const PORT = process.env.PORT || 5000;


app.use(express.static(path.join(__dirname, 'client/build')));


const api = require("./api");
app.use("/api",api);


app.listen(PORT, () => console.log('Server started on port ' + PORT));


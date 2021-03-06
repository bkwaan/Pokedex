const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();


app.use(cors());

//Connect DB
connectDB();

//MiddleWare
app.use(express.json({extended:false}));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started on port ' + PORT));

const api = require("./api");
app.use("/api",api);

app.get('/', (req,res) => res.send('API RUNNING'));


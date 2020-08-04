const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(cors());

//Connect DB
connectDB();

//MiddleWare
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server started on port " + PORT));

const api = require("./api");
app.use("/api", api);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.use('*', express.static(path.join(__dirname, "client", "build")))

}
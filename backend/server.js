// including all needed modules
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//
require("dotenv").config();

//creating express server on port 5000
const app = express();
const port = process.env.PORT || 5000;

// middleware with cors
app.use(cors());
app.use(express.json()); //to parse json

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// importing routes
const exerciseRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

// using the routes
app.use("./exercises", exerciseRouter);
app.use("./users", usersRouter);

//starting server on port
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

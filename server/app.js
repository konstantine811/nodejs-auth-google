const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

if (process.env.NODE_ENV === "test") {
  mongoose.connect(
    "mongodb+srv://const:sdra29071990@cluster0.kh6da.mongodb.net/apiAuthTest?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true }
  );
} else {
  mongoose.connect(
    "mongodb+srv://const:sdra29071990@cluster0.kh6da.mongodb.net/apiAuth?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true }
  );
}

const app = express();

// Middlewares moved morgan into if for clear tests
if (!process.env.NODE_ENV === "test") {
  app.use(morgan("dev"));
}
// Middlewares
app.use(bodyParser.json());
//Routes
app.use("/users", require("./routes/users"));

module.exports = app;

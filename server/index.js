const express = require("express");
const mongoose = require("mongoose");
const https = require('https');
const fs = require('fs');
const morgan = require('morgan');
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const postRoute = require("./Routes/PostRoute");
require("dotenv").config();

const app = express();
const { MONGO_URL, PORT } = process.env;

// Connect to MongoDB
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("MongoDB is connected successfully");
    console.log("mongo string ", MONGO_URL);
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    console.log("mongo string ", MONGO_URL);
    process.exit(1);
  });

const credentials = {
  key: fs.readFileSync("./key/key.pem"),
  cert: fs.readFileSync("./key/cert.pem"),
};

const httpsServer = https.createServer(credentials, app);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(morgan("dev")); // Log requests to the console using the 'dev' format
app.use(cookieParser());
app.use(express.json());

// Mount authentication routes under '/auth'
app.use("/auth", authRoute);

// Mount post-related routes under '/posts'
app.use("/posts", postRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

httpsServer.listen(PORT, () => {
  const address = `https://localhost:${PORT}`;
  console.log(`HTTPS server is listening on ${address}`);
});

module.exports = app;

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const postRoute = require("./Routes/PostRoute");
const {MONGO_URL}  = process.env;
const PORT = 8080;
const https = require('https');
const fs = require('fs');

mongoose
  .connect(MONGO_URL, {
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
  httpsServer.listen(PORT, () => {
    const address = `https://localhost:${PORT}`;
    console.log(`HTTPS server is listening on ${address}`);
  });

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
// Mount authentication routes under '/auth'
app.use("/auth", authRoute);

// Mount post-related routes under '/posts'
app.use("/posts", postRoute);

module.exports = app;


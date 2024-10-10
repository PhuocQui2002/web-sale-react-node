//import connectToMongoDB from "./db/connectToMongoDB";
const routes = require("./routes");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(express.json());
const port = process.env.PORT || 3001;
app.use(bodyParser.json());
// app.use(express.urlencoded({extended: true})); 
// app.use(express.json());
app.use(cookieParser());
routes(app);

mongoose
  .connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });
const server = app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});

// app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
// app.use(cookieParser());

// server.listen(port, () => {
//     connectToMongoDB();
//   console.log("listening on port: " + port);
// });

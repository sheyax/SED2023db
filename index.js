const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("./db");
const app = express();
var corsOptions = {
  credentials: true,
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://sedafrica.org",
  ],
};

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader(
    "Access-Control-Allow-Origin",
    "http://localhost:5173",
    "http://localhost:3000"
  );

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var reg = require("./controllers/registration");
var mailer = require("./controllers/mailSender");

let port = 5000;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});
app.use("/reg", reg);
app.use("/send", mailer);

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const userRouter = require("./routes/userRoutes");


app.get("/", (req, res) => res.send("Welcome"));

// Body Parser, reading data from body into req.body
// app.use(express.json({ limit: "5Mb" }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: '50mb'
  })
);
app.use(
  bodyParser.json({
    limit: '50mb'
  })
);

// Enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

// Routers
app.use("/api/v1/user", userRouter);

// 404 - NOT FOUND ROUTE
app.all("*", (req, res, next) => {
  next(new Error("App error"));
  res.send("URL NOT FOUND");
});

module.exports = app;

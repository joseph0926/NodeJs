const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({extended: false}));

app.use("/", (req, res, next) => {
  console.log("모든곳에 적용되는 미들웨어");
  next();
});

app.use("/admin", adminRoutes);

app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).send("<h1>404 Error</h1>");
});

const server = http.createServer(app);
server.listen(5000);
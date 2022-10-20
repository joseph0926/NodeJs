const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.set("view engine", "ejs");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const errorController = require("./controllers/404");

const mongoConnect = require("./util/database").mongoConnect;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  // User.findByPk(1)
  //   .then(user => {
  //     req.user = user;
  //     next();
  //   })
  //   .catch((err) => console.log(err));
  next();
});

app.use("/", (req, res, next) => {
  next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.getError);

mongoConnect(() => {
  app.listen(3000);
});

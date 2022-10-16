const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const db = require("./util/database");
const app = express();

app.set("view engine", "ejs");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

db.execute("SELECT * FROM products")
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  })

const errorController = require("./controllers/404");

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", (req, res, next) => {
  next();
});

app.use("/admin", adminRoutes);

app.use(shopRoutes);

app.use(errorController.getError);

const server = http.createServer(app);
server.listen(5000);
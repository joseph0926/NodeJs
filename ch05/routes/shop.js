const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("전체 미들웨어");
  // res.send("<h1>Home Page</h1>");
  res.sendFile(path.join(__dirname, "../", "views", "shop.html"));
});

module.exports = router;
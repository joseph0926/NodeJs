const express = require("express");
const path = require("path");
const rootDir = require("../util/path");

const router = express.Router();

router.get("/add-product", (req, res, next) => {
  console.log("product 미들웨어");
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});
router.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
})

module.exports = router;
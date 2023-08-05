const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/pizza/list");
});

router.get("/pizza/list", (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, "..", "..", "frontend", "views", "index.html"));
});

module.exports = router;

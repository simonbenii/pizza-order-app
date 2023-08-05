const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, "..", "..", "frontend", "views", "order.html"));
});

module.exports = router;

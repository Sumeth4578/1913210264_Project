var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.status(200).json({
    message: "RESTFul API FINAL 1913210264 (Stationery Shop)",
  });
});

module.exports = router;

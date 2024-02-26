var express = require("express");
var router = express.Router();

var database = require("../database");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.post("/", (req, res) => {
  var datas = {
    todo: req.body.todo
  };

  database.then((dbase) => {
    dbase
      .collection("userdata")
      .insertOne(datas)
      .then((result) => {
        console.log("created");
        console.log(result);
      });
  });
  res.redirect("/");
});

module.exports = router;

var express = require("express");
var router = express.Router();

var mongodb = require("mongodb").MongoClient;
var mongod = new mongodb("mongodb://localhost:27017");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.post("/", (req, res) => {
  mongod.connect().then((dbase) => {
    var database = dbase.db("TodoDB1");
    database
      .collection("userdata")
      .insertOne(req.body)
      .then((result) => {
        console.log(result);
        res.redirect("/");
      });
  });
});

module.exports = router;

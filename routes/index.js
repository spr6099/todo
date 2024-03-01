var express = require("express");
var router = express.Router();
var mongodb = require("mongodb");

var database = require("../database");

/* GET home page. */
router.get("/", function (req, res, next) {
  database.then((dbase) => {
    dbase
      .collection("userdata")
      .find({})
      .toArray()
      .then((result) => {
        // console.log(result);
        res.render("index", { result });
      });
  });
});

router.post("/", (req, res) => {
  var datas = {
    todo: req.body.todo,
  };
  database.then((dbase) => {
    dbase
      .collection("userdata")
      .insertOne(datas)
      .then((result) => {
        console.log("created");
        // console.log(result);
      });
  });
  res.redirect("/");
});

router.get("/delete/:id", (req, res) => {
  let id = req.params.id;
  database.then((dbase) => {
    dbase
      .collection("userdata")
      .deleteOne({ _id: new mongodb.ObjectId(id) })
      .then((result) => {
        // console.log(result);
        res.redirect("/");
      });
  });
});
 
router.get("/find/:id", (req, res) => {
  let id = req.params.id;
  database.then((dbase) => {
    dbase
      .collection("userdata")
      .findOne({ _id: new mongodb.ObjectId(id) })
      .then((findResult) => {
        console.log(findResult);
        res.render("update",{findResult});
      });
  });
});


router.post("/find/:id", (req, res) => {
  var id=req.params.id;
  var datas = {
    todo: req.body.todos,
  };
  database.then((dbase) => {
    dbase
      .collection("userdata")
      .updateOne({ _id: new mongodb.ObjectId(id) },{$set:datas})
      .then((result) => {
        console.log("created");
        // console.log(result);

      });
  });
  res.redirect("/");
});

module.exports = router;

var express = require("express");
var router = express.Router();
var mongodb = require("mongodb");
var database = require("../database");
const bcrypt = require("bcrypt");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("home");
});

router.get("/todo", function (req, res, next) {
  if(req.session.user){
    let login=true
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
}
else{
  res.redirect('/')
}
});

router.get("/register", function (req, res, next) {
  res.render("register");
});

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.post("/register", function (req, res) {
  var regData = {
    name: req.body.name,
    email: req.body.email,
    pswd: req.body.password,
  };
  database.then((dbase) => {
    bcrypt.hash(req.body.password, 10).then((passresult) => {
      regData.pswd = passresult;
      dbase
        .collection("regData")
        .insertOne(regData)
        .then((result) => {
          console.log(result);
        });
    });
  });
  res.redirect("/");
});

router.post("/todo", (req, res) => {
  if(req.session.user){
    let login=true
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
  res.redirect("/todo");
}
else{
  res.redirect("/");

}
});

router.get("/delete/:id", (req, res) => {
  let id = req.params.id;
  database.then((dbase) => {
    dbase
      .collection("userdata")
      .deleteOne({ _id: new mongodb.ObjectId(id) })
      .then((result) => {
        // console.log(result);
        res.redirect("/todo");
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
        res.render("update", { findResult });
      });
  });
});

router.post("/find/:id", (req, res) => {
  var id = req.params.id;
  var datas = {
    todo: req.body.todos,
  };
  database.then((dbase) => {
    dbase
      .collection("userdata")
      .updateOne({ _id: new mongodb.ObjectId(id) }, { $set: datas })
      .then((result) => {
        console.log("created");
        // console.log(result);
      });
  });
  res.redirect("/todo");
});

//Login
router.get("/login", (req, res) => {
  if (req.session.user) {
    res.render("index", { login: true });
  } else {
    res.render("index", { login: false });
  }
});

router.post("/login", (req, res) => {
  let loginData = {
    uName: req.body.username,
    Upswds: req.body.passwords,
  };
  // console.log(loginData.uName);
  database.then((dbase) => {
    dbase
      .collection("regData")
      .findOne({ email: loginData.uName })
      .then((logResult) => {
        console.log(logResult);
        let user = logResult;
        if (loginData) {
          bcrypt.compare(loginData.Upswds, user.pswd).then((pass) => {
            req.session.user = user;
            res.redirect("todo");
          });
        } else {
          console.log("error");
          res.redirect("/");
        }
      });
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;

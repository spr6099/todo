var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
// const assert = require("assert")


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index' );
});

router.post('/',function(req,res){
 res.send("connected")
 MongoClient.connect(url,function(err,client){
  if(err) throw err;
  // assert.equal(null,err);
  const db = client.db("tododb");
  db.collection("notes")
  console.log("connected succesfully to the server");

  client.close();
 })
})

module.exports = router;

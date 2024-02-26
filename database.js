var mongodb = require("mongodb").MongoClient;
var mongod = new mongodb("mongodb://localhost:27017");

function database() {
  return mongod.connect().then((formdb) => {
    var database1 = formdb.db("TodoDB");
    return database1;
  });
}
module.exports = database();

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (cb) => {
  MongoClient.connect("mongodb+srv://joseph0926:chlrkdgml77@cluster0.h0hyu1p.mongodb.net/shop?retryWrites=true&w=majority")
    .then((client) => {
      console.log("MongoDB 연결 성공!");
      _db = client.db()
      cb(client);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
}

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "DB 연결 오류"
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

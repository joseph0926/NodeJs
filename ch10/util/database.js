const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "chlrkdgml77!",
  database: "node-sql",
});

module.exports = pool.promise();
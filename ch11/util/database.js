const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-sql", "root", "chlrkdgml77!", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
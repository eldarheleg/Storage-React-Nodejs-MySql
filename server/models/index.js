const dbConfig = require('../config/dbConfig.json');

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.development.database, dbConfig.development.username, dbConfig.development.password, {
  host: dbConfig.development.host,
  dialect: dbConfig.development.dialect,
  operatorsAliases: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./users")(sequelize, Sequelize);

module.exports = db;
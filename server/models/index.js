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

db.user = require("./user")(sequelize, Sequelize);
db.employee = require("./employee")(sequelize, Sequelize);

//associations
db.employee.hasOne(db.user, {foreignKey: 'employeeId'})
db.user.belongsTo(db.employee)

db.ROLES = ["USER", "ADMIN"];

module.exports = db;
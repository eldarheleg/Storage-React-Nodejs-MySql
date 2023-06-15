const dbConfig = require('../config/dbConfig.json');

const Sequelize = require("sequelize");
const Employee = require('./employee');
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
db.role = require("./role")(sequelize, Sequelize);


//associations
//oneToOne db.user-db.employee
db.user.associate = (models) => {
  db.user.hasOne(models.employee)
}
db.employee.associate = (models) => {
  db.employee.belongsTo(models.user);
}

//oneToMany db.user db.role
db.role.belongsToMany(db.user, {
  through: "user_role",
  foreignKey: "roleId",
});
db.user.belongsToMany(db.role, {
  through: 'user_role',
  foreignKey: 'userId'
});

db.ROLES = ["user", "admin"];

module.exports = db;
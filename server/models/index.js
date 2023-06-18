const dbConfig = require("../config/dbConfig.json");
const mysql = require("mysql2/promise");

const Sequelize = require("sequelize");
const databaseName = "storage";

const { host, dialect, username, password, database } = dbConfig.development;

// connect to db
const sequelize = new Sequelize(databaseName, username, password, {
  dialect: dialect,
  host: host,
});

// create db if it doesn't already exist
sequelize.beforeConnect(async (config) => {
  const connection = await mysql.createConnection({
    host: host,
    user: username,
    password: password,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\`;`);
  //config.database = process.env.DB_NAME;
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// init models and add them to the exported db object
db.user = require("./user")(sequelize, Sequelize);
db.employee = require("./employee")(sequelize, Sequelize);

//associations
db.employee.hasOne(db.user, { foreignKey: "employeeId" });
db.user.belongsTo(db.employee, { foreignKey: "employeeId" });

db.ROLES = ["USER", "ADMIN"];

// ---------WITH CREATED DATABASE---------
// const sequelize = new Sequelize(
//   dbConfig.development.database,
//   dbConfig.development.username,
//   dbConfig.development.password,
//   {
//     host: dbConfig.development.host,
//     dialect: dbConfig.development.dialect,
//     operatorsAliases: false,
//   }
// )

module.exports = db;

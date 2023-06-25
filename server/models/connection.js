const dbConfig = require("../config/dbConfig.json");
const mysql = require("mysql2/promise");

const Sequelize = require("sequelize");
const databaseName = "storage";

const { host, dialect, username, password } = dbConfig.development;

// connect to db
const sequelize = new Sequelize(databaseName, username, password, {
  dialect: dialect,
  host: host,
});

// create db if it doesn't already exist
sequelize.beforeConnect(async () => {
  const connection = await mysql.createConnection({
    host: host,
    user: username,
    password: password,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\`;`);
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// init models and add them to the exported db object
db.user = require("./user")(sequelize, Sequelize);
db.employee = require("./employee")(sequelize, Sequelize);
db.product = require("./product")(sequelize, Sequelize);
db.process = require("./process")(sequelize, Sequelize);
db.processItem = require("./processItem")(sequelize, Sequelize);
db.material = require("./material")(sequelize, Sequelize);
db.supplier = require("./supplier")(sequelize, Sequelize);

//associations
db.employee.hasOne(db.user, { foreignKey: "employeeId", onUpdate: "CASCADE" });
db.user.belongsTo(db.employee, { foreignKey: "employeeId" });

db.supplier.hasMany(db.material, { foreignKey: "supplierId" });
db.material.belongsTo(db.supplier);

db.process.hasMany(db.product, { foreignKey: "processId" });
db.product.belongsTo(db.process);

db.material.hasMany(db.processItem, { foreignKey: "materialId" });
db.processItem.belongsTo(db.material);

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

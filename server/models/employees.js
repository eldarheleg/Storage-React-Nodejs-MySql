const user = require('./users')

module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define("Employee", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    adress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    fired_date: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });
//   Employee.belongsTo(User, {
//     foreignKey: "userId",
//   });
};

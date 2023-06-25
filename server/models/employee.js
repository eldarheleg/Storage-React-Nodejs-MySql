module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define("employee", {
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
      allowNull: true,
    },
    adress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    start_date: {
      type: DataTypes.DATE,
      default: Date.now(),
    },
    fired_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });
  return Employee;
};

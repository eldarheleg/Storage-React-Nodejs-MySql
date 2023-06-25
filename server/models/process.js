module.exports = (sequelize, DataTypes) => {
  const Process = sequelize.define("process", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    processName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      default: Date.now(),
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    processPrice: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  });
  return Process;
};

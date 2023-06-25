module.exports = (sequelize, DataTypes) => {
  const processItem = sequelize.define("processItem", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  });
  return processItem;
};

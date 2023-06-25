module.exports = (sequelize, DataTypes) => {
  const Material = sequelize.define("material", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    materialName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    minKolicina: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    unitMeasure: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    inUse: {
      type: DataTypes.BOOLEAN,
    },
  });
  return Material;
};

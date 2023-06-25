module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("product", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profitMargin: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    productPrice: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  });
  return Product;
};

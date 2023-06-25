module.exports = (sequelize, DataTypes) => {
  const Supplier = sequelize.define("supplier", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    supplierName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jib: {
      type: DataTypes.INTEGER(13),
      unique: true,
      allowNull: false,
    },
    pib: {
      type: DataTypes.INTEGER(12),
      unique: true,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      validate: {
        isNumeric: true,
      },
    },
    contactPerson: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    supplierEmail: {
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
  return Supplier;
};

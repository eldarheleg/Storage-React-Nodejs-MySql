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
      type: DataTypes.STRING(13),
      unique: true,
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [0,13]
      },
    },
    pib: {
      type: DataTypes.STRING(12),
      unique: true,
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [0,12]
      },
    },
    phoneNumber: {
      type: DataTypes.BIGINT,
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
      default: DataTypes.NOW,
    },
    fired_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });
  return Supplier;
};

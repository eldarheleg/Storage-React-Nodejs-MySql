const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define('role', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      });
    
}
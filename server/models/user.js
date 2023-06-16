
module.exports = (seqelize, DataTypes) => {
  const User = seqelize.define("user", {
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'USER'
    }
  });
  
  return User;
};

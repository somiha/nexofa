module.exports = (sequelize, DataTypes) => {
  const Level = sequelize.define("level", {
    level_name: {
      type: DataTypes.STRING,
    },
    level_pic: {
      type: DataTypes.STRING,
    },
    message: {
      type: DataTypes.STRING,
    },
  });
  return Level;
};

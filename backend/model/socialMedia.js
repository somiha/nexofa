module.exports = (sequelize, DataTypes) => {
  const Social = sequelize.define("social", {
    name: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    },
  });

  return Social;
};

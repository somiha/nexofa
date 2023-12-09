module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define("country", {
    country_name: {
      type: DataTypes.STRING,
    },
  });
  return Country;
};

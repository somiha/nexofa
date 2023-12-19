module.exports = (sequelize, DataTypes) => {
  const TryPackage = sequelize.define("try_package", {
    package_name: {
      type: DataTypes.STRING,
      defaultValue: "Gold",
    },
    price: {
      type: DataTypes.DOUBLE,
      defaultValue: 5,
    },
    duration: {
      type: DataTypes.STRING,
      defaultValue: "6 months",
    },
    package_details: {
      type: DataTypes.TEXT,
      defaultValue: "Gold Package",
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  });

  return TryPackage;
};

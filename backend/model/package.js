module.exports = (sequelize, DataTypes) => {
  const Package = sequelize.define("package", {
    // package_name: {
    //   type: DataTypes.STRING,
    // },
    // price: {
    //   type: DataTypes.DOUBLE,
    // },
    // duration: {
    //   type: DataTypes.STRING,
    // },
    // package_details: {
    //   type: DataTypes.TEXT,
    // },
    user_id: {
      type: DataTypes.INTEGER,
    },
  });

  return Package;
};

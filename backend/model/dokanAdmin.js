module.exports = (sequelize, DataTypes) => {
  const DokanAdmin = sequelize.define(
    "dokanadmins",
    {
      dokanName: {
        type: DataTypes.STRING,
      },
      ownerName: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
    }
  );
  return DokanAdmin;
};

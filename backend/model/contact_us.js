module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    "contact",
    {
      name: {
        type: DataTypes.STRING,
      },
      phone_number: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      message: {
        type: DataTypes.TEXT,
      },
      country: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
    }
  );
  return Contact;
};

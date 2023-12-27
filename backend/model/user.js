module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
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
      address: {
        type: DataTypes.STRING,
      },
      profile_pic: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      country: {
        type: DataTypes.STRING,
      },
      verification_code: {
        type: DataTypes.STRING,
      },
      is_verified: {
        type: DataTypes.INTEGER,
      },
      session_created_at: {
        type: DataTypes.DATE,
      },
      is_premium: {
        type: DataTypes.BOOLEAN,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );

  return User;
};

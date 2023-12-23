module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    "notification",
    {
      user_id: {
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      is_pinned: {
        type: DataTypes.INTEGER,
      },
      is_global: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: true,
    }
  );
  return Notification;
};

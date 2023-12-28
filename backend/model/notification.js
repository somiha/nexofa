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
        type: DataTypes.BOOLEAN,
      },
      is_global: {
        type: DataTypes.BOOLEAN,
      },
      is_new: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      timestamps: true,
    }
  );
  return Notification;
};

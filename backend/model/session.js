module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define("session", {
    session_name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    topic_id: {
      type: DataTypes.INTEGER,
    },
    completed: {
      type: DataTypes.INTEGER,
    },
    numberOfLevel: {
      type: DataTypes.INTEGER,
    },
  });

  Session.associate = (models) => {
    Session.hasMany(models.SessionLevel, { foreignKey: "session_id" });
    Session.belongsTo(models.User, { foreignKey: "user_id" });
    Session.belongsTo(models.Topic, { foreignKey: "topic_id" });
  };

  return Session;
};

module.exports = (sequelize, DataTypes) => {
  const SessionLevel = sequelize.define("session_level", {
    level_id: {
      type: DataTypes.STRING,
    },
    session_id: {
      type: DataTypes.INTEGER,
    },
    is_completed: {
      type: DataTypes.BOOLEAN,
      default: 0,
    },
  });
  SessionLevel.associate = (models) => {
    SessionLevel.belongsTo(models.Session, { foreignKey: "session_id" });
    SessionLevel.belongsTo(models.Level, { foreignKey: "level_id" });
    SessionLevel.belongsTo(models.Session, { foreignKey: "session_id" });
  };
  return SessionLevel;
};

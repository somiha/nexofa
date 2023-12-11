module.exports = (sequelize, DataTypes) => {
  const Level = sequelize.define("level", {
    level_name: {
      type: DataTypes.STRING,
    },
    message: {
      type: DataTypes.STRING,
    },
    topic_id: {
      type: DataTypes.INTEGER,
    },
  });
  Level.associate = (models) => {
    Level.belongsTo(models.Topic, { foreignKey: "topic_id" });
  };
  return Level;
};

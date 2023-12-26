module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define("answer", {
    question_id: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.STRING,
    },
    answer: {
      type: DataTypes.STRING,
    },
    session_level_id: {
      type: DataTypes.INTEGER,
    },
  });

  Answer.associate = (models) => {
    Answer.belongsTo(models.User, { foreignKey: "user_id" });
    Answer.belongsTo(models.SessionLevel, { foreignKey: "session_level_id" });
  };

  return Answer;
};

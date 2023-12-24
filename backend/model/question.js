module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define("question", {
    question: {
      type: DataTypes.STRING,
    },
    suggested_answers: {
      type: DataTypes.STRING,
    },
    topic_id: {
      type: DataTypes.INTEGER,
    },
    level_id: {
      type: DataTypes.INTEGER,
    },
  });

  Question.associate = (models) => {
    Question.belongsTo(models.Level, { foreignKey: "level_id" });
    Question.belongsTo(models.Topic, { foreignKey: "topic_id" });
  };

  return Question;
};

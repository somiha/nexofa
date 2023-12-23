module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define("topic", {
    topic_name: {
      type: DataTypes.STRING,
    },
    topic_pic: {
      type: DataTypes.STRING,
    },
    topic_des: {
      type: DataTypes.STRING,
    },
  });
  Topic.associate = (models) => {
    Topic.hasMany(models.Level, { foreignKey: "topic_id" });
  };
  return Topic;
};

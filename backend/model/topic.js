module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define("topic", {
    topic_name: {
      type: DataTypes.STRING,
    },
    topic_pic: {
      type: DataTypes.STRING,
    },
  });
  return Topic;
};

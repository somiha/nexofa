module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define("session", {
    session_name: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    completed: {
      type: DataTypes.DOUBLE,
    },
    topic_id: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING,
    },
  });
  return Session;
};

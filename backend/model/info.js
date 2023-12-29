module.exports = (sequelize, DataTypes) => {
  const Info = sequelize.define("info", {
    terms_policy: {
      type: DataTypes.TEXT,
    },
    about_us: {
      type: DataTypes.TEXT,
    },
    how_to_use_app: {
      type: DataTypes.STRING,
    },
    written_instruction: {
      type: DataTypes.TEXT,
    },
  });

  return Info;
};

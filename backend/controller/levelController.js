const db = require("../model/database");
const User = db.user;
const Topic = db.topic;
const Session = db.session;
const Level = db.level;
const baseUrl = process.env.baseUrl;

exports.addLevel = async (req, res, next) => {
  try {
    const topic_id = req.query.topic_id;
    const { level_name, message } = req.body;

    console.log(1);
    console.log(req.body);
    const existingTopic = await Topic.findByPk(topic_id);

    if (!existingTopic) {
      return res.status(400).json({ msg: "Topic not found" });
    }

    const newLevel = await Level.create({
      level_name,
      message,
      topic_id: topic_id,
    });

    return res
      .status(200)
      .json({ msg: "Level created successfully", level: newLevel });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.getLevelsByTopic = async (req, res, next) => {
  try {
    const topic_id = req.query.topic_id;

    if (!topic_id) {
      return res.status(400).json({ msg: "Topic ID not provided" });
    }
    const topic = await Topic.findByPk(topic_id);

    if (!topic) {
      return res.status(400).json({ msg: "Topic not found" });
    }
    const levels = await Level.findAll({
      where: {
        topic_id: topic_id,
      },
    });

    const levelsWithTopicName = levels.map((level) => ({
      ...level.toJSON(),
      topic_name: topic.topic_name,
    }));

    return res.status(200).json({ levels: levelsWithTopicName });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

exports.getAllLevels = async (req, res, next) => {
  try {
    const levels = await Level.findAll();

    return res.status(200).json({ levels });
  } catch (e) {
    console.error("Error in getAllLevels:", e);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

exports.updateLevel = async (req, res, next) => {
  try {
    const level_id = req.query.level_id;
    const { level_name, message } = req.body;

    const existingLevel = await Level.findByPk(level_id);

    if (!existingLevel) {
      return res.status(400).json({ msg: "Level not found" });
    }

    existingLevel.level_name = level_name;
    existingLevel.message = message;

    await existingLevel.save();

    return res
      .status(200)
      .json({ msg: "Level updated successfully", level: existingLevel });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

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

    const level_pic = req.files["level_pic"];

    let levelImageUrl = null;

    if (level_pic && level_pic.length > 0) {
      levelImageUrl = `${baseUrl}/uploads/${level_pic[0].filename}`;
    }
    console.log(req.body);
    const existingTopic = await Topic.findByPk(topic_id);

    if (!existingTopic) {
      return res.status(400).json({ status: false, msg: "Topic not found" });
    }

    const newLevel = await Level.create({
      level_name,
      message,
      level_pic: levelImageUrl,
      topic_id: topic_id,
    });

    return res.status(200).json({
      status: true,
      msg: "Level created successfully",
      level: newLevel,
    });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};

exports.getLevelsByTopic = async (req, res, next) => {
  try {
    const topic_id = req.query.topic_id;

    if (!topic_id) {
      return res
        .status(400)
        .json({ status: false, msg: "Topic ID not provided" });
    }
    const topic = await Topic.findByPk(topic_id);

    if (!topic) {
      return res.status(400).json({ status: false, msg: "Topic not found" });
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

    return res
      .status(200)
      .json({
        status: true,
        msg: "Level get successfully",
        levels: levelsWithTopicName,
      });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ status: false, msg: "Something went wrong" });
  }
};

exports.getAllLevels = async (req, res, next) => {
  try {
    const levels = await Level.findAll();

    return res
      .status(200)
      .json({ status: true, msg: "Level get successfully", levels });
  } catch (e) {
    console.error("Error in getAllLevels:", e);
    return res.status(500).json({ status: false, msg: "Something went wrong" });
  }
};

exports.updateLevel = async (req, res, next) => {
  try {
    const level_id = req.query.level_id;
    const { level_name, message } = req.body;
    const level_pic = req.files["level_pic"];
    const existingLevel = await Level.findByPk(level_id);

    if (!existingLevel) {
      return res.status(400).json({ status: false, msg: "Level not found" });
    }
    let levelImageUrl = existingLevel.level_pic;

    if (level_pic && level_pic.length > 0) {
      levelImageUrl = `${baseUrl}/uploads/${level_pic[0].filename}`;
    }
    existingLevel.level_name = level_name;
    existingLevel.message = message;
    existingLevel.level_pic = levelImageUrl;

    await existingLevel.save();

    return res.status(200).json({
      status: true,
      msg: "Level updated successfully",
      level: existingLevel,
    });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};

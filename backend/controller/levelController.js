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
    // const level_pic = req.files["level_pic"];
    console.log(1);
    console.log(req.body);
    const existingTopic = await Topic.findByPk(topic_id);
    // console.log(existingSession);
    if (!existingTopic) {
      return res.status(400).json({ msg: "Topic not found" });
    }

    // let levelImageUrl = null;

    // if (level_pic && level_pic.length > 0) {
    //   levelImageUrl = `${baseUrl}/uploads/${level_pic[0].filename}`;
    // }

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
      return res.status(400).json({ msg: "Session ID not provided" });
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

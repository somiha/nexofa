const db = require("../model/database");
const User = db.user;
const Topic = db.topic;
const Session = db.session;
const baseUrl = process.env.baseUrl;

exports.addTopic = async (req, res, next) => {
  try {
    const { topic_name, topic_des } = req.body;
    const topic_pic = req.files["topic_pic"];

    let topicImageUrl = null;

    if (topic_pic && topic_pic.length > 0) {
      topicImageUrl = `${baseUrl}/uploads/${topic_pic[0].filename}`;
    }

    const newTopic = await Topic.create({
      topic_name,
      topic_pic: topicImageUrl,
      topic_des,
    });

    return res
      .status(200)
      .json({ msg: "Topic created successfully", topic: newTopic });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.getAllTopics = async (req, res, next) => {
  try {
    const topics = await Topic.findAll();
    return res.status(200).json({ topics });
  } catch (err) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

exports.updateTopic = async (req, res, next) => {
  try {
    const topic_id = req.query.topic_id;
    const { topic_name, topic_des } = req.body;
    const topic_pic = req.files["topic_pic"];

    const existingTopic = await Topic.findByPk(topic_id);

    if (!existingTopic) {
      return res.status(400).json({ msg: "Topic not found" });
    }

    let topicImageUrl = existingTopic.topic_pic;

    if (topic_pic && topic_pic.length > 0) {
      topicImageUrl = `${baseUrl}/uploads/${topic_pic[0].filename}`;
    }

    existingTopic.topic_name = topic_name;
    existingTopic.topic_pic = topicImageUrl;
    existingTopic.topic_des = topic_des;

    await existingTopic.save();

    return res
      .status(200)
      .json({ msg: "Topic updated successfully", topic: existingTopic });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

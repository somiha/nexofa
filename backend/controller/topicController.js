const db = require("../model/database");
const User = db.user;
const Topic = db.topic;
const Session = db.session;
const baseUrl = process.env.baseUrl;

exports.addTopic = async (req, res, next) => {
  try {
    const { topic_name } = req.body;
    const topic_pic = req.files["topic_pic"];

    let topicImageUrl = null;

    if (topic_pic && topic_pic.length > 0) {
      topicImageUrl = `${baseUrl}/uploads/${topic_pic[0].filename}`;
    }

    const newTopic = await Topic.create({
      topic_name,
      topic_pic: topicImageUrl,
    });

    return res
      .status(200)
      .json({ msg: "Topic created successfully", topic: newTopic });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const db = require("../../model/database");
const User = db.user;
const Topic = db.topic;
const Session = db.session;
const TryPackage = db.tryPackage;
const Package = db.package;
const baseUrl = process.env.baseUrl;
const fs = require("fs");
const path = require("path");

const { Sequelize } = require("sequelize");

exports.getTopics = async (req, res, next) => {
  try {
    const topics = await Topic.findAll();

    return res.status(200).render("pages/allTopics", {
      title: "Topics",
      topics,
    });
  } catch (e) {
    console.log(e);
    return res.status(503).json({ msg: "Internal Server Error" });
  }
};

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

    return res.redirect("/topics");
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

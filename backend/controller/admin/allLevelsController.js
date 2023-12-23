const { log } = require("console");
const db = require("../../model/database");
const User = db.user;
const Level = db.level;
const Topic = db.topic;
const TryPackage = db.tryPackage;
const Package = db.package;
const baseUrl = process.env.baseUrl;
const fs = require("fs");
const path = require("path");

const { Sequelize } = require("sequelize");

exports.getLevels = async (req, res, next) => {
  try {
    const levels = await Level.findAll();
    const topics = await Topic.findAll();

    return res.status(200).render("pages/allLevels", {
      title: "Levels",
      levels,
      topics,
    });
  } catch (e) {
    console.log(e);
    return res.status(503).json({ msg: "Internal Server Error" });
  }
};

exports.addLevel = async (req, res, next) => {
  try {
    console.log(req.body);
    const { level_name, message, topic_id } = req.body;
    console.log(req.body);
    const level_pic = req.files["level_pic"];

    let levelImageUrl = null;

    if (level_pic && level_pic.length > 0) {
      levelImageUrl = `${baseUrl}/uploads/${level_pic[0].filename}`;
    }

    const newLevel = await Level.create({
      level_name,
      level_pic: levelImageUrl,
      message,
      topic_id,
    });

    return res.redirect("/levels");
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const e = require("express");
const db = require("../model/database");

const User = db.user;
const Topic = db.topic;
const Session = db.session;
const Level = db.level;
const Question = db.question;
const baseUrl = process.env.baseUrl;

exports.addQuestion = async (req, res, next) => {
  try {
    const topic_id = req.query.topic_id;
    const level_id = req.query.level_id;
    const { question, suggested_answer } = req.body;

    const level = await Level.findOne({
      where: {
        id: level_id,
      },
    });

    console.log("Provided level_id:", level_id);
    console.log("Provided topic_id:", topic_id);
    console.log("Fetched level:", level.dataValues.topic_id);

    if (level.dataValues.topic_id != topic_id) {
      return res.status(400).json({ msg: "this level not in this topic" });
    }

    const existingTopic = await Topic.findByPk(topic_id);
    const existingLevel = await Level.findByPk(level_id);
    // console.log(existingSession);
    if (!existingTopic || !existingLevel) {
      return res.status(400).json({ msg: "Topic/Level not found" });
    }

    const newQuestion = await Question.create({
      question,
      suggested_answer,
      topic_id,
      level_id,
    });

    return res
      .status(200)
      .json({ msg: "Question created successfully", question: newQuestion });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// exports.getQuestionsByLevel = async (req, res, next) => {
//   try {
//     const level_id = req.query.level_id;
//     const questions = await Question.findAll({
//       where: {
//         level_id,
//       },
//     });
//     return res.status(200).json({ questions });
//   } catch (err) {
//     return res.status(500).json({ msg: "Internal Server Error" });
//   }
// };

exports.getQuestionsByLevel = async (req, res, next) => {
  try {
    const level_id = req.query.level_id;
    const questions = await Question.findAll({
      where: {
        level_id,
      },
      include: [
        {
          model: Topic,
          attributes: ["topic_name"],
          as: "topic",
        },
      ],
    });

    return res.status(200).json({ questions });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.updateQuestion = async (req, res, next) => {
  try {
    const question_id = req.query.question_id;
    const { question, suggested_answer } = req.body;

    const existingQuestion = await Question.findByPk(question_id);

    if (!existingQuestion) {
      return res.status(400).json({ msg: "Level not found" });
    }

    existingQuestion.question = question;
    existingQuestion.suggested_answer = suggested_answer;

    await existingQuestion.save();

    return res
      .status(200)
      .json({ msg: "Level updated successfully", question: existingQuestion });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

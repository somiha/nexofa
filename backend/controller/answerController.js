const e = require("express");
const db = require("../model/database");
const User = db.user;
const Topic = db.topic;
const Session = db.session;
const Level = db.level;
const Question = db.question;
const SessionLevel = db.sessionLevel;
const Answer = db.answer;
const baseUrl = process.env.baseUrl;

exports.addAnswers = async (req, res, next) => {
  try {
    const session_level_id = req.query.session_level_id;
    const level_id = req.query.level_id;
    const user_id = req.query.user_id;
    const { answers } = req.body;

    const sessionLevel = await SessionLevel.findOne({
      where: {
        id: session_level_id,
      },
    });

    if (sessionLevel.level_id !== level_id) {
      return res
        .status(400)
        .json({ msg: "this level not in this session level" });
    }

    await saveAnswer(answers, session_level_id, user_id);

    await SessionLevel.update(
      { is_completed: 1 },
      { where: { id: session_level_id, level_id } }
    );

    return res.status(200).json({ msg: "Answer saved successfully" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

async function saveAnswer(answers, session_level_id, user_id) {
  await Promise.all(
    answers.map(async (answer) => {
      return await Answer.create({
        question_id: answer.question_id,
        user_id,
        answer: answer.answer,
        session_level_id,
      });
    })
  );
}

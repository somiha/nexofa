const db = require("../model/database");
const User = db.user;
const Topic = db.topic;
const Session = db.session;
const Level = db.level;
const SessionLevel = db.sessionLevel;
const Op = require("sequelize").Op;

const { Sequelize } = require("sequelize");

exports.addSession = async (req, res, next) => {
  try {
    const user_id = req.query.userId;
    const topic_id = req.query.topicId;

    const existingUser = await User.findByPk(user_id);

    if (!existingUser) {
      return res.status(400).json({ msg: "User not found" });
    }

    const existingTopic = await Topic.findByPk(topic_id);

    if (!existingTopic) {
      return res.status(400).json({ msg: "Topic not found" });
    }

    const numberOfLevels = await Level.count({
      where: {
        topic_id: topic_id,
      },
    });

    const newSession = await Session.create({
      session_name: existingTopic.topic_name,
      topic_id: topic_id,
      user_id: user_id,
      description: existingTopic.topic_des,
      completed: 0,
      numberOfLevel: numberOfLevels,
    });

    const createdSession = await Session.findByPk(newSession.id);

    const levels = await Level.findAll({
      where: {
        topic_id: topic_id,
      },
    });

    const sessionLevels = await createSessionLevels(levels, createdSession);

    return res.status(200).json({
      msg: "Session and levels created successfully",
      session: createdSession,
      levels: sessionLevels,
    });
  } catch (e) {
    console.error(e);

    if (e.name === "SequelizeForeignKeyConstraintError") {
      return res
        .status(400)
        .json({ msg: "Invalid user_id or topic_id. User or Topic not found." });
    }

    return res.status(500).json({ msg: "Something went wrong" });
  }
};

async function createSessionLevels(levels, createdSession) {
  const sessionLevels = await Promise.all(
    levels.map(async (level) => {
      return await SessionLevel.create({
        level_id: level.id,
        session_id: createdSession.id,
      });
    })
  );

  return sessionLevels;
}

exports.getSessionsByUserTopic = async (req, res, next) => {
  try {
    const userId = req.query.user_id;
    const topic_id = req.query.topic_id;

    if (!userId) {
      return res.status(400).json({ msg: "User ID not provided" });
    }
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    console.log("here");
    const sessions = await Session.findAll({
      where: {
        user_id: userId,
        topic_id: topic_id,
      },
      order: [["createdAt", "DESC"]],
    });

    console.log({ sessions });

    return res.status(200).json({ sessions });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

exports.getSessionsByTopicId = async (req, res, next) => {
  try {
    const topicId = req.query.topicId;

    if (!topicId) {
      return res.status(400).json({ msg: "Topic ID not provided" });
    }
    const topic = await Topic.findByPk(topicId);

    if (!topic) {
      return res.status(400).json({ msg: "Topic not found" });
    }
    const sessions = await Session.findAll({
      where: {
        topic_id: topicId,
      },
      order: [["createdAt", "DESC"]],
    });

    const sessionsWithTopicName = sessions.map((session) => ({
      ...session.toJSON(),
      topic_name: topic.topic_name,
    }));

    return res.status(200).json({ sessions: sessionsWithTopicName });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

exports.getAllSessions = async (req, res, next) => {
  try {
    const sessions = await Session.findAll();

    const topicIds = sessions.map((session) => session.topic_id);

    const topics = await Topic.findAll({
      where: {
        id: topicIds,
      },
      order: [["createdAt", "DESC"]],
    });

    const topicMap = topics.reduce((map, topic) => {
      map[topic.id] = topic;
      return map;
    }, {});

    const sessionsWithTopicName = sessions.map((session) => ({
      ...session.toJSON(),
      topic_name: session.topic_id
        ? topicMap[session.topic_id].topic_name
        : null,
    }));

    return res.status(200).json({ sessions: sessionsWithTopicName });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

exports.getCompletedSessionsByUserId = async (req, res, next) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({ msg: "User ID not provided" });
    }
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    const sessions = await Session.findAll({
      where: {
        user_id: userId,
        completed: 100,
      },
      order: [["createdAt", "DESC"]],
    });

    const topicIds = sessions.map((session) => session.topic_id);

    const topics = await Topic.findAll({
      where: {
        id: topicIds,
      },
    });

    const topicMap = topics.reduce((map, topic) => {
      map[topic.id] = topic;
      return map;
    }, {});

    const sessionsWithTopicName = sessions.map((session) => ({
      ...session.toJSON(),
      topic_name: session.topic_id
        ? topicMap[session.topic_id].topic_name
        : null,
    }));

    return res.status(200).json({ sessions: sessionsWithTopicName });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

exports.updateSession = async (req, res, next) => {
  try {
    const session_id = req.query.session_id;
    const { session_name, description } = req.body;

    const existingSession = await Session.findByPk(session_id);

    if (!existingSession) {
      return res.status(400).json({ msg: "Level not found" });
    }

    existingSession.session_name = session_name;
    existingSession.description = description;

    await existingSession.save();

    return res
      .status(200)
      .json({ msg: "Session updated successfully", session: existingSession });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

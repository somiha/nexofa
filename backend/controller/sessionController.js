const db = require("../model/database");
const User = db.user;
const Topic = db.topic;
const Session = db.session;
const Op = require("sequelize").Op;

exports.addSession = async (req, res, next) => {
  try {
    const { session_name, topic_id, description, completed, user_id } =
      req.body;

    const user = req.query.userId;
    const topic = req.query.topicId;

    console.log(user);

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    const newSession = await Session.create({
      session_name,
      topic_id: topic,
      user_id: user,
      description,
      completed,
    });

    const createdSession = await Session.findByPk(newSession.id);

    return res
      .status(200)
      .json({ msg: "Session created successfully", session: createdSession });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

exports.getSessionsByUserId = async (req, res, next) => {
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
      },
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

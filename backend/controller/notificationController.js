const db = require("../model/database");
const Notification = db.notification;
const { Op } = require("sequelize");

exports.addNotification = async (req, res, next) => {
  try {
    const { title, description, isGlobal, userId, isPinned } = req.body;
    if (userId === undefined) {
      userId = null;
    }

    const newNotification = await Notification.create({
      title: title,
      description: description,
      is_global: isGlobal,
      is_pinned: isPinned,
      user_id: userId,
    });

    return res.status(200).json({
      msg: "Notification created successfully",
      data: {
        notification: newNotification,
      },
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.getNotificationByUser = async (req, res, next) => {
  try {
    const user_id = req.query.user_id;

    if (!user_id) {
      return res.status(400).json({ msg: "User ID not provided" });
    }

    const notifications = await Notification.findAll({
      where: {
        [Op.or]: [{ user_id: user_id }, { is_global: true }],
      },
      order: [
        ["is_pinned", "DESC"],
        ["created_at", "DESC"],
      ],
    });

    if (!notifications || packages.length === 0) {
      return res
        .status(404)
        .json({ msg: "No notification found for the user" });
    }

    return res.status(200).json({ packages: notifications });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

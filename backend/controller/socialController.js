const db = require("../model/database");
const User = db.user;
const Social = db.social;
const Session = db.session;
const baseUrl = process.env.baseUrl;

exports.addSocial = async (req, res, next) => {
  try {
    const { name, url } = req.body;

    const newSocial = await Social.create({
      name,
      url,
    });

    return res.status(200).json({
      status: true,
      msg: "Social Media created successfully",
      social: newSocial,
    });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};

exports.getAllSocials = async (req, res, next) => {
  try {
    const socials = await Social.findAll();
    return res
      .status(200)
      .json({
        status: true,
        msg: "get all social media link successfully",
        socials,
      });
  } catch (err) {
    return res.status(500).json({ status: false, msg: "Something went wrong" });
  }
};

exports.updateSocial = async (req, res, next) => {
  try {
    const social_id = req.query.social_id;
    const { name, url } = req.body;

    const existingSocial = await Social.findByPk(social_id);

    if (!existingSocial) {
      return res.status(400).json({ status: false, msg: "Social not found" });
    }

    existingSocial.name = name;
    existingSocial.url = url;

    await existingSocial.save();

    return res.status(200).json({
      status: true,
      msg: "Social updated successfully",
      social: existingSocial,
    });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};

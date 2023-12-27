const db = require("../model/database");
const User = db.user;
const Package = db.package;
const Info = db.info;
const baseUrl = process.env.baseUrl;

exports.addInfo = async (req, res, next) => {
  try {
    const { terms_policy, about_us } = req.body;
    const how_to_use_app = req.file;
    let videoUrl = null;

    if (how_to_use_app) {
      videoUrl = `${baseUrl}/uploads/${how_to_use_app.filename}`;
    }

    const newInfo = await Info.create({
      terms_policy,
      about_us,
      how_to_use_app: videoUrl,
    });

    return res
      .status(200)
      .json({ status: true, msg: "Info created successfully", Info: newInfo });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};

exports.getTermsPolicy = async (req, res, next) => {
  try {
    const infoList = await Info.findAll();

    if (!infoList || infoList.length === 0) {
      return res.status(404).json({ status: false, msg: "Info not found" });
    }

    const terms_policy = infoList.map((info) => info.terms_policy);

    return res.status(200).json({
      status: true,
      msg: "Get terms and policy successfully",
      terms_policy: terms_policy,
    });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};

exports.getHowToUseApp = async (req, res, next) => {
  try {
    const infoList = await Info.findAll();

    if (!infoList || infoList.length === 0) {
      return res.status(404).json({ status: false, msg: "Info not found" });
    }

    const how_to_use_app = infoList.map((info) => info.how_to_use_app);

    return res.status(200).json({
      status: true,
      msg: "how to use app get successfully",
      how_to_use_app: how_to_use_app,
    });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};

exports.getAboutUs = async (req, res, next) => {
  try {
    const infoList = await Info.findAll();

    if (!infoList || infoList.length === 0) {
      return res.status(404).json({ status: false, msg: "Info not found" });
    }
    const aboutUsList = infoList.map((info) => info.about_us);

    return res.status(200).json({
      status: true,
      msg: "get about us successfully",
      about_us: aboutUsList,
    });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};

const db = require("../model/database");
const User = db.user;
const tryPackage = db.tryPackage;
const Session = db.session;
const baseUrl = process.env.baseUrl;

exports.addTryPackage = async (req, res, next) => {
  try {
    const { package_name, price, duration, package_details } = req.body;
    const user_id = req.query.user_id;
    const existingPackage = await tryPackage.findOne({
      where: {
        user_id: user_id,
      },
    });

    if (existingPackage) {
      return res.status(400).json({ msg: "User already has a package" });
    }
    const newTryPackage = await tryPackage.create({
      package_name,
      price,
      duration,
      package_details,
      user_id: user_id,
    });

    return res
      .status(200)
      .json({ msg: "Package created successfully", package: newTryPackage });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.getTryPackageByUser = async (req, res, next) => {
  try {
    const user_id = req.query.user_id;

    if (!user_id) {
      return res.status(400).json({ msg: "User ID not provided" });
    }

    const tryPackages = await tryPackage.findAll({
      where: {
        user_id: user_id,
      },
      include: [
        {
          model: User,
          attributes: ["name", "phone_number", "email", "address"],
        },
      ],
    });

    if (!tryPackages || tryPackages.length === 0) {
      return res.status(404).json({ msg: "No packages found for the user" });
    }

    return res.status(200).json({ packages: tryPackages });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

exports.getAllTryPackages = async (req, res, next) => {
  try {
    const tryPackages = await tryPackage.findAll({
      include: [
        {
          model: User,
          attributes: ["name", "phone_number", "email", "address"],
        },
      ],
    });
    return res.status(200).json({ tryPackages });
  } catch (err) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

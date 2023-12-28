const db = require("../model/database");
const User = db.user;
const Package = db.package;
const Session = db.session;
const baseUrl = process.env.baseUrl;

exports.addPackage = async (req, res, next) => {
  try {
    // const { package_name, price, duration, package_details } = req.body;
    const user_id = req.query.user_id;
    const newPackage = await Package.create({
      //   package_name,
      //   price,
      //   duration,
      //   package_details,
      user_id: user_id,
    });

    return res.status(200).json({
      status: true,
      msg: "Package created successfully",
      package: newPackage,
    });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};

// exports.getPackageByUser = async (req, res, next) => {
//   try {
//     const user_id = req.query.user_id;

//     if (!user_id) {
//       return res.status(400).json({ msg: "User ID not provided" });
//     }
//     const user = await User.findByPk(user_id);

//     if (!user) {
//       return res.status(400).json({ msg: "User not found" });
//     }
//     const packages = await Package.findAll({
//       where: {
//         user_id: user_id,
//       },
//     });

//     return res.status(200).json({ packages: packages });
//   } catch (e) {
//     console.error(e);
//     return res.status(500).json({ msg: "Something went wrong" });
//   }
// };

exports.getPackageByUser = async (req, res, next) => {
  try {
    const user_id = req.query.user_id;

    if (!user_id) {
      return res
        .status(400)
        .json({ status: false, msg: "User ID not provided" });
    }

    const packages = await Package.findAll({
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

    if (!packages || packages.length === 0) {
      return res
        .status(404)
        .json({ status: false, msg: "No packages found for the user" });
    }

    return res.status(200).json({
      status: true,
      msg: "get packages by user successfully",
      packages: packages,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ status: false, msg: "Something went wrong" });
  }
};

exports.getAllPackages = async (req, res, next) => {
  try {
    const packages = await Package.findAll({
      include: [
        {
          model: User,
          attributes: ["name", "phone_number", "email", "address"],
        },
      ],
    });
    return res
      .status(200)
      .json({ status: true, msg: "get all packages successfully", packages });
  } catch (err) {
    return res.status(500).json({ status: false, msg: "Something went wrong" });
  }
};

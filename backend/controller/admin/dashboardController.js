const db = require("../../model/database");
const User = db.user;
const Contact = db.contact;
const Session = db.session;
const TryPackage = db.tryPackage;
const Package = db.package;
const baseUrl = process.env.baseUrl;
const fs = require("fs");
const path = require("path");

const { Sequelize } = require("sequelize");

exports.getDashboard = async (req, res, next) => {
  try {
    const premiumUserCount = await TryPackage.count("user_id", {
      distinct: true,
      include: [
        {
          model: User,
          attributes: [],
        },
      ],
      group: ["try_package.id"],
    });

    const premiumButtonUserCount = await Package.count("user_id", {
      distinct: true,
      include: [
        {
          model: User,
          attributes: [],
        },
      ],
      group: ["try_package.id"],
    });

    const userCount = await TryPackage.count("user_id", {
      group: ["user.id"],
    });

    console.log("Number of unique users:", premiumUserCount);

    const users = await User.findAll();

    return res.status(200).render("pages/dashboard", {
      title: "Dashboard",
      premiumUserCount,
      premiumButtonUserCount,
      userCount,
      users,
    });
  } catch (e) {
    console.log(e);
    return res.status(503).json({ msg: "Internal Server Error" });
  }
};

exports.updateUserProfile = async (req, res, next) => {
  try {
    const { edit_id, edit_name, edit_email, edit_mobile_number, edit_country } =
      req.body;
    const userId = req.query.userId;

    console.log(userId);
    console.log(req.body);

    const user = await User.findOne({
      where: {
        id: edit_id,
      },
    });

    if (!user) {
      return res.status(401).json({ msg: "You are not authorized." });
    }

    user.name = edit_name || user.name;
    user.email = edit_email || user.email;
    user.mobile_number = edit_mobile_number || user.mobile_number;
    user.country = edit_country || user.country;

    // Handle profile picture update
    const profile_pic = req.files && req.files["profile_pic"];

    if (profile_pic && profile_pic.length > 0) {
      const filename = profile_pic[0].filename;

      const profileImageUrl = `${baseUrl}/uploads/${profile_pic[0].filename}`;

      if (user.profile_pic) {
        const profilePicPath = path.join(
          __dirname,
          "../public/uploads",
          path.basename(user.profile_pic)
        );

        // Delete old profile picture if exists
        await fs.unlink(profilePicPath, (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log("Old profile picture deleted successfully.");
          }
        });
      }

      // Save new profile picture path to the user
      user.profile_pic = profileImageUrl;
    }

    // Save the updated user profile
    await user.save();

    return res.redirect("/");
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      msg: "Something went wrong. Please try again with correct information.",
    });
  }
};

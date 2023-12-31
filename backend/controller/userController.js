const db = require("../model/database");
const Customer = db.customer;
const User = db.user;
const Op = require("sequelize").Op;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const seacret = "alskfjdfoiawenf23";

const fs = require("fs").promises;
const path = require("path");

const multiUpload = require("./../middleware/multiupload");
const baseUrl = process.env.baseUrl;

exports.register = async (req, res, next) => {
  try {
    const {
      name,
      phone_number,
      email,
      address,
      password,
      confirmedPaword,
      country,
    } = req.body;

    const user = await User.findAll({
      where: {
        [Op.or]: [{ email: email }, { phone_number: phone_number }],
      },
    });

    console.log("user", user);

    if (user.length) {
      return res.status(400).json({
        status: false,
        msg: "User is already exist with this phone or email. Try new email and phone number",
      });
    }

    if (password !== confirmedPaword) {
      return res
        .status(400)
        .json({ status: false, msg: "Password doesn't match." });
    }

    let hashPassword = await bcrypt.hash(password, 10);

    // const verification_code = Math.floor(1000 + Math.random() * 9000);
    const verification_code = 1234;

    const newUser = await User.create({
      name,
      phone_number,
      email,
      address,
      country,
      password: hashPassword,
      verification_code,
      is_verified: 0,
    });

    if (newUser) {
      return res.status(200).json({
        status: true,
        msg: "User has been created successfully.",
        user: newUser,
      });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, msg: "Account Creation Failed." });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { user_identifier, password } = req.body;
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: user_identifier },
          { phone_number: user_identifier },
        ],
      },
    });

    if (!user) {
      return res
        .status(400)
        .json({ status: false, msg: "User with this phone does not exist!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ status: false, msg: "Incorrect password." });
    }

    const token = jwt.sign({ id: user.id, name: user.name }, seacret);

    return res
      .status(200)
      .json({ status: true, msg: "log in successfully", token, user: user });
  } catch (err) {
    return res.status(500).json({ status: false, msg: "something wrong" });
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const { previous_password, new_password, confirmed_password } = req.body;
    const userId = req.userId;
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res
        .status(401)
        .json({ status: false, msg: "You are not authorized." });
    }

    const isMatch = await bcrypt.compare(previous_password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ status: false, msg: "Provide correct password." });
    }

    if (new_password !== confirmed_password) {
      return res
        .status(400)
        .json({ status: false, msg: "Password did't match." });
    }

    let hashPassword = await bcrypt.hash(new_password, 10);

    const updatedUser = await User.update(
      { password: hashPassword },
      {
        where: {
          id: userId,
        },
      }
    );

    return res.status(200).json({
      status: true,
      msg: "Password has been updated successfully.",
      user: user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Something went wrong. Please try again with correct information.",
    });
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { name, email, mobile_number, country } = req.body;
    const userId = req.query.userId;

    console.log(userId);
    console.log(req.body);

    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res
        .status(401)
        .json({ status: false, msg: "You are not authorized." });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.mobile_number = mobile_number || user.mobile_number;
    user.country = country || user.country;

    const profile_pic = req.files["profile_pic"];

    if (profile_pic && profile_pic.length > 0) {
      const filename = profile_pic[0].filename;

      const profileImageUrl = `${baseUrl}/uploads/${profile_pic[0].filename}`;

      if (user.profile_pic) {
        const profilePicPath = path.join(
          __dirname,
          "../public/uploads",
          path.basename(user.profile_pic)
        );

        await fs.unlink(profilePicPath);
      }
      user.profile_pic = profileImageUrl;
    }

    await user.save();

    return res.status(200).json({
      status: true,
      msg: "Profile has been updated successfully.",
      user: user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      msg: "Something went wrong. Please try again with correct information.",
    });
  }
};

exports.forgetPasswordSentCode = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return req
        .status(200)
        .json({ status: false, msg: "User Not Found with this email." });
    }
    // const verification_code = Math.floor(1000 + Math.random() * 9000);
    const verification_code = "1234";

    user.verification_code = verification_code;

    await user.save();

    return res
      .status(200)
      .json({ status: true, msg: "Code has been sent to your email." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: false,
      msg: "Something went wrong. Please try again with correct information.",
    });
  }
};

exports.confirmCode = async (req, res, next) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return req
        .status(200)
        .json({ status: false, msg: "User Not Found with this email." });
    }

    if (user.verification_code != code) {
      return res.status(400).json({ status: false, msg: "Invalid Code" });
    }

    return res
      .status(200)
      .json({ status: true, msg: "Successfully verified user." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: false,
      msg: "Something went wrong. Please try again with correct information.",
    });
  }
};

exports.createPassword = async (req, res, next) => {
  try {
    const { email, new_password, confirmed_password } = req.body;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res
        .status(401)
        .json({ status: false, msg: "No user found with this email." });
    }

    if (new_password !== confirmed_password) {
      return res
        .status(400)
        .json({ status: false, msg: "Password did't match." });
    }

    let hashPassword = await bcrypt.hash(new_password, 10);

    const updatedUser = await User.update(
      { password: hashPassword },
      {
        where: {
          email: email,
        },
      }
    );

    return res.status(200).json({
      status: true,
      msg: "Password has been updated successfully.",
      user: updatedUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      msg: "Something went wrong. Please try again with correct information.",
    });
  }
};

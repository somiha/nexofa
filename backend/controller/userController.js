const db = require("../model/database");
const Customer = db.customer;
const User = db.user;
const Op = require("sequelize").Op;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const seacret = "alskfjdfoiawenf23";

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
        msg: "User is already exist with this phone or email. Try new email and phone number",
      });
    }

    if (password !== confirmedPaword) {
      return res.status(400).json({ msg: "Password doesn't match." });
    }

    let hashPassword = await bcrypt.hash(password, 10);

    const verification_code = Math.floor(1000 + Math.random() * 9000);

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
      return res
        .status(200)
        .json({ msg: "User has been created successfully." });
    }
  } catch (err) {
    return res.status(500).json({ msg: "Account Creation Failed." });
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
        .json({ msg: "User with this phone does not exist!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect password." });
    }

    const token = jwt.sign({ id: user.id, name: user.name }, seacret);

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ msg: "something wrong" });
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
      return res.status(401).json({ msg: "You are not authorized." });
    }

    const isMatch = await bcrypt.compare(previous_password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Provide correct password." });
    }

    if (new_password !== confirmed_password) {
      return res.status(400).json({ msg: "Password did't match." });
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

    return res
      .status(200)
      .json({ msg: "Password has been updated successfully." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Something went wrong. Please try again with correct information.",
    });
  }
};

const db = require("../model/database");
const Customer = db.customer;
const User = db.user;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

    if (user) {
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
        .json({ msg: "User has been created successfully. P" });
    }
  } catch (err) {
    res.status(500).json({ msg: "Account Creation Failed." });
  }
};

exports.addCustomer = async (req, res, next) => {
  try {
    let { customerName, customerPhone, customerAddress } = req.body;
    let dokanId = req.dokanId;

    const customer = await Customer.findAll({
      where: {
        dokanId: dokanId,
        customerPhone: customerPhone,
        status: "1",
      },
    });
    if (customer.length > 0) {
      return res.status(400).json({ msg: "Customer Already Exists" });
    }

    const newCustomer = await Customer.create({
      dokanId,
      customerName,
      customerPhone,
      customerAddress,
      totalAmount: 0,
      status: "1",
    });

    if (newCustomer) {
      return res.status(200).json({ msg: "Customer create success" });
    } else {
      return res.status(400).json({ msg: "Customer create fail " });
    }
  } catch (e) {
    return res.status(500).json({ msg: "something wrong" });
  }
};

exports.getAllCustomer = async (req, res, next) => {
  try {
    const customers = await Customer.findAll({
      where: { status: "1", dokanId: req.dokanId },
    });
    return res.status(200).json(customers);
  } catch (e) {
    return res.status(500).json({ msg: "something wrong" });
  }
};

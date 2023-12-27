const db = require("../model/database");
const User = db.user;
const Contact = db.contact;
const Session = db.session;
const baseUrl = process.env.baseUrl;

exports.addContactUs = async (req, res, next) => {
  try {
    const { name, phone_number, email, message, country } = req.body;

    const newContactUs = await Contact.create({
      name,
      phone_number,
      email,
      message,
      country,
    });

    return res.status(200).json({
      status: true,
      msg: "Contact_us created successfully",
      contact_us: newContactUs,
    });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};

exports.getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findAll();
    return res
      .status(200)
      .json({ status: true, msg: "Get Contact Us Info Succesfully", contact });
  } catch (err) {
    return res.status(500).json({ status: false, msg: "Something went wrong" });
  }
};

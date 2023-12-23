const db = require("../../model/database");
const User = db.user;
const Session = db.session;
const TryPackage = db.tryPackage;
const Contact = db.contact;
const baseUrl = process.env.baseUrl;
const fs = require("fs");
const path = require("path");

const { Sequelize } = require("sequelize");

exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.findAll();

    return res.status(200).render("pages/message", {
      title: "Contacts",
      contacts,
    });
  } catch (e) {
    console.log(e);
    return res.status(503).json({ msg: "Internal Server Error" });
  }
};

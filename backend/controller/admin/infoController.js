const db = require("../../model/database");
const User = db.user;
const Info = db.info;
const Social = db.social;
const TryPackage = db.tryPackage;
const Package = db.package;
const baseUrl = process.env.baseUrl;
const fs = require("fs");
const path = require("path");

const { Sequelize } = require("sequelize");

exports.getInfos = async (req, res, next) => {
  try {
    const infos = await Social.findAll();

    return res.status(200).render("pages/settings", {
      title: "Infos",
      infos,
    });
  } catch (e) {
    console.log(e);
    return res.status(503).json({ msg: "Internal Server Error" });
  }
};

exports.updateSocialLink = async (req, res, next) => {
  try {
    const {
      facebookLink,
      twitterLink,
      linkedinLink,
      whatsappLink,
      instagramLink,
    } = req.body;

    // Define an array of social link names
    const socialLinks = [
      "Facebook",
      "Twitter",
      "Linkedin",
      "Whatsapp",
      "Instagram",
    ];

    // Iterate over each social link
    for (const socialLink of socialLinks) {
      const linkValue = req.body[`${socialLink.toLowerCase()}Link`];

      let socialInfo = await Social.findOne({
        where: {
          name: socialLink,
        },
      });

      if (socialInfo) {
        // If the social link exists, update it
        socialInfo.url = linkValue;
        await socialInfo.save();
      } else {
        // If the social link doesn't exist, create a new one
        await Social.create({
          name: socialLink,
          url: linkValue,
        });
      }
    }

    return res.redirect("/settings");
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

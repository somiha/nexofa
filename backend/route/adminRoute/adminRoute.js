const router = require("express").Router();
const {
  getDashboard,
  updateUserProfile,
} = require("../../controller/admin/dashboardController");
const {
  getTopics,
  addTopic,
} = require("../../controller/admin/allTopicsController");
const {
  getLevels,
  addLevel,
} = require("../../controller/admin/allLevelsController");
const { getContacts } = require("../../controller/admin/messageController");
const {
  getInfos,
  updateSocialLink,
} = require("../../controller/admin/infoController");

const multiUpload = require("../../middleware/multiupload");

router.get("/", getDashboard);
router.post(
  "/update-user",

  multiUpload.fields([{ name: "profile_pic" }]),
  updateUserProfile
);
router.get("/topics", getTopics);
router.post(
  "/add-topic",
  multiUpload.fields([{ name: "topic_pic" }]),
  addTopic
);

router.get("/levels", getLevels);
router.post(
  "/add-level",
  multiUpload.fields([{ name: "level_pic" }]),
  addLevel
);

router.get("/messages", getContacts);
router.get("/settings", getInfos);
router.post("/update-links", updateSocialLink);

module.exports = router;

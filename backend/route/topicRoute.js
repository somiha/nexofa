const router = require("express").Router();
const { addTopic } = require("../controller/topicController");
const auth = require("../middleware/auth");
const multiUpload = require("../middleware/multiupload");

router.post(
  "/add-topic",
  multiUpload.fields([{ name: "topic_pic" }]),
  addTopic
);

module.exports = router;

const router = require("express").Router();
const {
  addTopic,
  getAllTopics,
  updateTopic,
} = require("../controller/topicController");
const auth = require("../middleware/auth");
const multiUpload = require("../middleware/multiupload");

router.post(
  "/add-topic",
  multiUpload.fields([{ name: "topic_pic" }]),
  addTopic
);

router.get("/get-topic", getAllTopics);

router.post(
  "/update-topic",
  multiUpload.fields([{ name: "topic_pic" }]),
  updateTopic
);

module.exports = router;

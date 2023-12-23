const router = require("express").Router();
const {
  addLevel,
  getLevelsByTopic,
  getAllLevels,
  updateLevel,
} = require("../controller/levelController");
const auth = require("../middleware/auth");
const multiUpload = require("../middleware/multiupload");

router.post(
  "/add-level",
  multiUpload.fields([{ name: "level_pic" }]),
  addLevel
);
router.get("/get-level-by-topic", getLevelsByTopic);
router.get("/get-level", getAllLevels);
router.post(
  "/update-level",
  multiUpload.fields([{ name: "level_pic" }]),
  updateLevel
);
module.exports = router;

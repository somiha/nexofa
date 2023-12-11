const router = require("express").Router();
const {
  addLevel,
  getLevelsByTopic,
  getAllLevels,
} = require("../controller/levelController");
const auth = require("../middleware/auth");
const multiUpload = require("../middleware/multiupload");

router.post("/add-level", addLevel);
router.get("/get-level-by-topic", getLevelsByTopic);
router.get("/get-level", getAllLevels);
module.exports = router;

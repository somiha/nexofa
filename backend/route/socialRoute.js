const router = require("express").Router();
const {
  addSocial,
  getAllSocials,
  updateSocial,
} = require("../controller/socialController");
const auth = require("../middleware/auth");
const multiUpload = require("../middleware/multiupload");

router.post("/add-social", addSocial);

router.get("/get-social", getAllSocials);

router.post("/update-social", updateSocial);

module.exports = router;

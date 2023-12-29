const router = require("express").Router();
const {
  addInfo,
  getTermsPolicy,
  getAboutUs,
  getHowToUseApp,
  getWrittenInstruction,
} = require("../controller/infoController");
const auth = require("../middleware/auth");
const multiUpload = require("../middleware/multiupload");

router.post("/add-info", multiUpload.single("how_to_use_app"), addInfo);

router.get("/get-terms-policy", getTermsPolicy);
router.get("/get-about-us", getAboutUs);
router.get("/get-how-use-app", getHowToUseApp);
router.get("/get-written-intruction", getWrittenInstruction);

module.exports = router;

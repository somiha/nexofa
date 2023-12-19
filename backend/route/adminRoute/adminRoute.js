const router = require("express").Router();
const {
  getDashboard,
  updateUserProfile,
} = require("../../controller/admin/dashboardController");
const multiUpload = require("../../middleware/multiupload");

router.get("/", getDashboard);
router.post(
  "/update-user",

  multiUpload.fields([{ name: "profile_pic" }]),
  updateUserProfile
);

module.exports = router;

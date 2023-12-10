const router = require("express").Router();
const {
  register,
  login,
  updatePassword,
  updateProfile,
} = require("../controller/userController");
const auth = require("../middleware/auth");
const multiUpload = require("../middleware/multiupload");

router.post("/register", register);
router.post("/login", login);
router.post("/update-password", auth, updatePassword);
router.post(
  "/update-profile",
  auth,
  multiUpload.fields([{ name: "profile_pic" }]),
  updateProfile
);

module.exports = router;

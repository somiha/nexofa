const router = require("express").Router();
const {
  register,
  login,
  updatePassword,
  updateProfile,
  forgetPasswordSentCode,
  confirmCode,
  createPassword,
} = require("../controller/userController");
const auth = require("../middleware/auth");
const multiUpload = require("../middleware/multiupload");

router.post("/register", register);
router.post("/login", login);
router.post("/update-password", auth, updatePassword);
router.post(
  "/update-profile",

  multiUpload.fields([{ name: "profile_pic" }]),
  updateProfile
);

router.post("/forget-password", forgetPasswordSentCode);
router.post("/confirm-code", confirmCode);
router.post("/create-new-password", createPassword);

module.exports = router;

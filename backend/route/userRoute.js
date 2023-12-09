const router = require("express").Router();
const {
  register,
  login,
  updatePassword,
} = require("../controller/userController");
const auth = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/update-password", auth, updatePassword);

module.exports = router;

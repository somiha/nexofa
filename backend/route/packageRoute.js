const router = require("express").Router();
const {
  addPackage,
  getAllPackages,
  getPackageByUser,
} = require("../controller/packageController");
const auth = require("../middleware/auth");
const multiUpload = require("../middleware/multiupload");

router.post("/add-package", addPackage);
router.get("/get-package-user", getPackageByUser);
router.get("/get-package", getAllPackages);

module.exports = router;

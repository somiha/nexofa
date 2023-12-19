const router = require("express").Router();
const {
  addTryPackage,
  getAllTryPackages,
  getTryPackageByUser,
} = require("../controller/tryPackageController");
const auth = require("../middleware/auth");
const multiUpload = require("../middleware/multiupload");

router.post("/add-try-package", addTryPackage);
router.get("/get-try-package-user", getTryPackageByUser);
router.get("/get-try-package", getAllTryPackages);

module.exports = router;

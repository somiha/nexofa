const router = require("express").Router();
const {
  addContactUs,
  getContact,
} = require("../controller/contactUsController");
const auth = require("../middleware/auth");
const multiUpload = require("../middleware/multiupload");

router.post("/add-contact", addContactUs);
router.get("/get-contact", getContact);

module.exports = router;

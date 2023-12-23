const router = require("express").Router();
const {
  addNotification,
  getNotificationByUser,
} = require("../controller/notificationController");

router.post("/add-notification", addNotification);
router.get("/get-notifications", getNotificationByUser);

module.exports = router;

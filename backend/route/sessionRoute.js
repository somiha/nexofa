const router = require("express").Router();
const {
  addSession,
  getSessionsByUserTopic,
  getSessionsByTopicId,
  getAllSessions,
  getCompletedSessionsByUserId,
  updateSession,
} = require("../controller/sessionController");
const auth = require("../middleware/auth");

router.post("/add-session", addSession);
router.get("/get-session-user-topic", getSessionsByUserTopic);
router.get("/get-session-topic", getSessionsByTopicId);
router.get("/get-session", getAllSessions);
router.get("/session-history", getCompletedSessionsByUserId);
router.post("/update-session", updateSession);

module.exports = router;

const router = require("express").Router();
const {
  addSession,
  getSessionsByUserId,
  getSessionsByTopicId,
  getAllSessions,
  getCompletedSessionsByUserId,
} = require("../controller/sessionController");
const auth = require("../middleware/auth");

router.post("/add-session", addSession);
router.get("/get-session-user", getSessionsByUserId);
router.get("/get-session-topic", getSessionsByTopicId);
router.get("/get-session", getAllSessions);
router.get("/session-history", getCompletedSessionsByUserId);

module.exports = router;

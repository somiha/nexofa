const router = require("express").Router();
const {
  addAnswers,
  getAnswersBySessionLevelId,
  getAnswersByTopicAndLevel,
} = require("../controller/answerController");

router.post("/add-answers", addAnswers);
router.get("/get-answers", getAnswersBySessionLevelId);
router.get("/get-answers-topic-level", getAnswersByTopicAndLevel);

module.exports = router;

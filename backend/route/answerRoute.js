const router = require("express").Router();
const {
  addAnswers,
  getAnswersBySessionLevelId,
} = require("../controller/answerController");

router.post("/add-answers", addAnswers);
router.get("/get-answers", getAnswersBySessionLevelId);

module.exports = router;

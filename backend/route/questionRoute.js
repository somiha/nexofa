const router = require("express").Router();
const {
  addQuestion,
  getQuestionsByLevel,
  updateQuestion,
} = require("../controller/questionController");

router.post("/add-question", addQuestion);
router.post("/update-question", updateQuestion);
router.get("/get-question-by-topic", getQuestionsByLevel);
module.exports = router;

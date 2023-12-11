const router = require("express").Router();
const {
  addQuestion,
  getQuestionsByLevel,
} = require("../controller/questionController");

router.post("/add-question", addQuestion);
router.get("/get-question-by-topic", getQuestionsByLevel);
module.exports = router;

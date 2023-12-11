const router = require("express").Router();
const { addAnswers } = require("../controller/answerController");

router.post("/add-answers", addAnswers);
module.exports = router;

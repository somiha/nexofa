const e = require("express");
const db = require("../model/database");
const { where } = require("sequelize");
const User = db.user;
const Topic = db.topic;
const Session = db.session;
const Level = db.level;
const Question = db.question;
const SessionLevel = db.sessionLevel;
const Answer = db.answer;
const baseUrl = process.env.baseUrl;
const { Sequelize } = require("sequelize");
const fsp = require("fs").promises;

const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const { log } = require("console");
const puppeteer = require("puppeteer");

// async function generateSessionLevelPDF(sessionLevelId, session_id, userId) {
//   const sessionLevels = await SessionLevel.findAll({
//     where: {
//       session_id: session_id,
//     },
//   });
//   console.log("sl", sessionLevels);
//   let questionsAndAnswers = {};
//   let level = 1;
//   for (let sessionLevel of sessionLevels) {
//     const qna = await getQuestionsAndAnswers(sessionLevel.id, userId);
//     questionsAndAnswers[level] = qna;
//     console.log("qna", qna);
//     level++;
//   }
//   console.log({ questionsAndAnswers });

//   const doc = new PDFDocument();
//   const outputPath = `session_level_${sessionLevelId}_answers.pdf`;

//   doc.pipe(fs.createWriteStream(outputPath));

//   const htmlTemplate = `
//     <div class="header-container">
//       <h1>Swot Analysis</h1>
//     </div>
//     <div class="grid-container">
//       ${generateSwotCard("Strengths", questionsAndAnswers[1])}
//       ${generateSwotCard("Weaknesses", questionsAndAnswers[2])}
//       ${generateSwotCard("Opportunities", questionsAndAnswers[3])}
//       ${generateSwotCard("Threats", questionsAndAnswers[4])}
//     </div>
//     <div class="footer-container">
//       <span>SWOT Editor is open source on <a href="https://git.io/vyqlq" target="_blank">GitHub</a></span>
//     </div>
//   `;

//   doc
//     .fontSize(16)
//     .text(`Session Level ${sessionLevelId} Questions and Answers`, {
//       align: "center",
//     });
//   doc.moveDown();

//   // Add HTML content to the PDF using doc.text
//   doc.text(htmlTemplate, { align: "left" });

//   doc.end();

//   console.log(`PDF saved to: ${outputPath}`);
// }

async function generateSessionLevelPDF(sessionLevelId, session_id, userId) {
  const sessionLevels = await SessionLevel.findAll({
    where: {
      session_id: session_id,
    },
  });
  console.log("sl", sessionLevels);
  let questionsAndAnswers = {};
  let level = 1;
  for (let sessionLevel of sessionLevels) {
    const qna = await getQuestionsAndAnswers(sessionLevel.id, userId);
    questionsAndAnswers[level] = qna;
    console.log("qna", qna);
    level++;
  }
  console.log({ questionsAndAnswers });

  const htmlTemplate = `
  <html>
    <head>
      <title>SWOT Analysis</title>
      <meta name="theme-color" content="#08191e">
      <meta content="width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes" name="viewport">
      <style>
       @import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900");
@import url("https://fonts.googleapis.com/css?family=Maven+Pro:400,500,700,900");
html, body {
  margin: 0px;
  font-family: sans-serif;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif; }

.header-container {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  background: #212730;
  color: white;
  height: 128px;
  padding: 0 24px;
  position: relative;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 3px 1px -2px rgba(0, 0, 0, 0.18), 0 1px 5px 0 rgba(0, 0, 0, 0.12); }
  @media (max-width: 480px) {
    .header-container {
      height: 80px;
      padding: 0 16px; } }
  .header-container h1 {
    font-weight: 400;
    letter-spacing: 0.1em;
    font-size: 2.5em;
    font-family: "Maven Pro", sans-serif; }
    @media (max-width: 480px) {
      .header-container h1 {
        letter-spacing: auto;
        font-size: 1.4em; } }

h2 {
  padding: 0;
  width: 100%;
  font-weight: 300;
  box-sizing: border-box;
  margin: 0;
  font-family: "Maven Pro", sans-serif; }
  @media (max-width: 480px) {
    h2 {
      font-weight: 500;
      font-size: 1em; } }

.grid-container {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap; }
  .grid-container .grid-item {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    width: 50%;
    min-height: 320px;
    box-sizing: border-box;
    -webkit-transition: box-shadow .6s ease;
    -moz-transition: box-shadow .6s ease;
    -o-transition: box-shadow .6s ease;
    transition: box-shadow .6s ease; }
    @media (max-width: 480px) {
      .grid-container .grid-item {
        min-height: 256px; } }
    .grid-container .grid-item .card {
      width: 100%;
      min-height: 360px;
      box-sizing: border-box;
      padding: 24px; }
      @media (max-width: 480px) {
        .grid-container .grid-item .card {
          min-height: 256px;
          padding: 16px; } }
      .grid-container .grid-item .card .swot-editor {
        margin-top: 24px;
        min-height: 300px; }
        @media (max-width: 480px) {
          .grid-container .grid-item .card .swot-editor {
            min-height: 172px;
            padding: 16px; } }
      .grid-container .grid-item .card .swot-editor:focus {
        outline: none; }
  .grid-container .grid-item:hover, .grid-container .grid-item:focus {
    -webkit-box-shadow: 0px 4px 43px 0px rgba(0, 0, 0, 0.25);
    -moz-box-shadow: 0px 4px 43px 0px rgba(0, 0, 0, 0.25);
    box-shadow: 0px 4px 43px 0px rgba(0, 0, 0, 0.25);
    z-index: 1; }

.strengths {
  background: #F8F8E8;
  color: #333C4A; }

.weaknesses {
  background: #fafae5;
  color: #333C4A; }

.opportunities {
  background: #404e5b;
  color: #F8FCEB; }

.threats {
  background: #333C4A;
  color: #F8FCEB; }

.footer-container {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  min-height: 96px;
  background: #212730;
  color: #fafae5;
  font-family: "Roboto", sans-serif;
  padding: 0 24px;
  font-size: 0.9em; }
  .footer-container span {
    margin-right: 12px; }
    .footer-container span a {
      font-weight: 600;
      color: white;
      text-decoration: none; }

/*# sourceMappingURL=style.css.map */


      </style>
    </head>
    <body>
      <div class="header-container">
        <h1>Swot Analysis</h1>
      </div>
      <div class="grid-container">
        ${generateSwotCard("Strengths", questionsAndAnswers[1])}
        ${generateSwotCard("Weaknesses", questionsAndAnswers[2])}
        ${generateSwotCard("Opportunities", questionsAndAnswers[3])}
        ${generateSwotCard("Threats", questionsAndAnswers[4])}
      </div>
      
    </body>
  </html>
`;

  // const outputPath = `session_level_${sessionLevelId}_answers.pdf`;
  const outputPath = `./public/pdf/uploads/${`session_${session_id}_answers.pdf`}`;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlTemplate);

  // await page.screenshot({ path: "screenshot.png" });
  await page.pdf({ path: outputPath, format: "A4", printBackground: true });

  await browser.close();
  const pdfUrl = `${baseUrl}/pdf/uploads/${`session_${session_id}_answers.pdf`}`;

  console.log(`PDF saved to: ${outputPath}`);
  const session = await Session.findOne({
    where: {
      id: session_id,
    },
  });

  if (session) {
    session.swot_pdf = pdfUrl;
    await session.save();
    console.log("PDF path saved to the Session table");
  } else {
    console.error("Session not found");
  }
}

function generateSwotCard(title, data) {
  return `
    <div class="grid-item">
      <div class="card ${title.toLowerCase()}">
        <h2>${title}</h2>
        <div class="swot-editor">
          ${generateSwotContent(data)}
        </div>
      </div>
    </div>
  `;
}

function generateSwotContent(data) {
  let content = "";
  for (let qnaItem of data) {
    let { question, answer } = qnaItem;
    // content += `<p><strong>Question:</strong> ${question}</p>`;
    content += `<p><strong>*</strong> ${answer}</p>`;
  }
  return content;
}

// async function generateSessionLevelPDF(sessionLevelId, session_id, userId) {
//   const sessionLevels = await SessionLevel.findAll({
//     where: {
//       session_id: session_id,
//     },
//   });
//   console.log("sl", sessionLevels);
//   let questionsAndAnswers = {};
//   let level = 1;
//   for (let sessionLevel of sessionLevels) {
//     const qna = await getQuestionsAndAnswers(sessionLevel.id, userId);
//     questionsAndAnswers[level] = qna;
//     console.log("qna", qna);
//     level++;
//   }
//   console.log({ questionsAndAnswers });

//   const doc = new PDFDocument();
//   const outputPath = `session_level_${sessionLevelId}_answers.pdf`;

//   doc.pipe(fs.createWriteStream(outputPath));

//   doc
//     .fontSize(16)
//     .text(`Session Level ${sessionLevelId} Questions and Answers`, {
//       align: "center",
//     });
//   doc.moveDown();

//   const htmlTemplate = `
//   <html>
//     <head>
//       <title>SWOT Analysis</title>
//       <meta name="description" content="">
//       <meta name="keywords" content="">
//       <meta name="copyright" content="Copyright © 2016 ________. All Rights Reserved.">
//       <meta name="theme-color" content="#08191e">
//       <meta content="width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes" name="viewport">
//       <link rel="stylesheet" href="public/css/SWOT.css"> <!-- Replace with the correct path -->
//       <link rel="stylesheet" href="public/css/beagle.css"> <!-- Replace with the correct path -->
//     </head>
//     <body>
//       <div class="header-container">
//         <h1>Swot Analysis</h1>
//       </div>
//       <div class="grid-container">
//         ${generateSwotCard("Strengths", questionsAndAnswers[1])}
//         ${generateSwotCard("Weaknesses", questionsAndAnswers[2])}
//         ${generateSwotCard("Opportunities", questionsAndAnswers[3])}
//         ${generateSwotCard("Threats", questionsAndAnswers[4])}
//       </div>
//       <div class="footer-container">
//         <span>SWOT Editor is open source on <a href="https://git.io/vyqlq" target="_blank">GitHub</a></span>
//       </div>
//     </body>
//   </html>
// `;

//   function generateSwotCard(title, data) {
//     return `
//     <div class="grid-item">
//       <div class="card ${title.toLowerCase()}">
//         <h2>${title}</h2>
//         <div class="swot-editor">
//           ${generateSwotContent(data)}
//         </div>
//       </div>
//     </div>
//   `;
//   }

//   function generateSwotContent(data) {
//     let content = "";
//     for (let qnaItem of data) {
//       let { question, answer } = qnaItem;
//       content += `<p><strong>Question:</strong> ${question}</p>`;
//       content += `<p><strong>Answer:</strong> ${answer}</p>`;
//     }
//     return content;
//   }

//   console.log(questionsAndAnswers);

//   for (let item in questionsAndAnswers) {
//     console.log({ item });
//     console.log(questionsAndAnswers[item]);
//     // let { question, answer } = questionsAndAnswers[item];
//     // console.log("Processing question:", question);
//     // console.log("Processing answer:", answer);
//     doc.fontSize(16).text(`Level ${item} :`);
//     for (let qnaItem of questionsAndAnswers[item]) {
//       let { question, answer } = qnaItem;
//       doc.fontSize(12).text(`Question: ${question}`);
//       doc.fontSize(10).text(`Answer: ${answer}`);
//     }
//     // doc.fontSize(12).text(`Question: ${question}`);
//     // doc.fontSize(10).text(`Answer: ${answer}`);
//     doc.moveDown();
//   }

//   doc.end();

//   console.log(`PDF saved to: ${outputPath}`);
// }

async function getQuestionsAndAnswers(sessionLevelId, userId) {
  const answers = await Answer.findAll({
    where: { session_level_id: sessionLevelId, user_id: userId },
  });
  console.log(answers);
  const questionIds = answers.map((answer) => answer.question_id);
  console.log("Question IDs:", questionIds);

  if (questionIds.length === 0) {
    return [];
  }

  const questions = await Question.findAll({
    where: { id: questionIds },
  });
  console.log("Retrieved Questions:", questions);

  return answers.map((answer) => {
    const question = questions.find((q) => q.id === answer.question_id);
    console.log("Answer:", answer);
    console.log("Question:", question);
    return {
      question: question ? question.question : "Unknown Question",
      answer: answer.answer,
    };
  });
}

exports.addAnswers = async (req, res, next) => {
  try {
    const session_level_id = req.query.session_level_id;
    const level_id = req.query.level_id;
    const user_id = req.query.user_id;
    const answers = req.body;

    const sessionLevel = await SessionLevel.findOne({
      where: {
        id: session_level_id,
      },
    });

    if (sessionLevel.level_id !== level_id) {
      return res
        .status(400)
        .json({ status: false, msg: "this level not in this session level" });
    }

    // console.log(answers, session_level_id, user_id);

    await saveAnswer(answers, session_level_id, user_id);

    await SessionLevel.update(
      { is_completed: 1 },
      { where: { id: session_level_id, level_id } }
    );

    await Session.update(
      { completed: Sequelize.literal("completed + 1") },
      {
        where: {
          id: sessionLevel.session_id,
        },
      }
    );

    const session = await Session.findOne({
      where: {
        id: sessionLevel.session_id,
      },
    });

    if (session.completed === session.numberOfLevel) {
      await generateSessionLevelPDF(session_level_id, session.id, user_id);
    }

    return res.status(200).json({
      status: true,
      msg: "Answer saved successfully",
      answers: JSON.parse(answers.answers),
    });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};

async function saveAnswer(answers, session_level_id, user_id) {
  try {
    console.log(1);

    const data = answers;
    const parsedData = JSON.parse(data.answers);
    const answersArray = parsedData.answers;

    if (Array.isArray(answersArray) && answersArray.length > 0) {
      console.log(2);
      // Process each answer
      for (const [index, answer] of answersArray.entries()) {
        const questionId = answer.question_id;
        const answerText = answer.answer;

        // Save to the database or perform any other necessary action
        // For demonstration purposes, we'll just log the data
        console.log(
          `Answer ${
            index + 1
          }: Question ID - ${questionId}, Answer - ${answerText}`
        );

        // Create and save an Answer for each element in the answers array
        await Answer.create({
          question_id: questionId,
          user_id,
          answer: answerText,
          session_level_id,
        });
      }

      console.log("Answers saved successfully");
    }
  } catch (error) {
    console.error("Error saving answers:", error);
    // Handle the error or return accordingly
  }
}

// async function saveAnswer(answers, session_level_id, user_id) {
//   await Promise.all(
//     answers.map(async (answer) => {
//       return await Answer.create({
//         question_id: answer.question_id,
//         user_id,
//         answer: answer.answer,
//         session_level_id,
//       });
//     })
//   );
// }

exports.getAnswersBySessionLevelId = async (req, res, next) => {
  try {
    const session_level_id = req.query.session_level_id;
    if (!session_level_id) {
      return res.status(400).json({
        status: false,
        msg: "Session level ID is missing in the request",
      });
    }
    const answers = await Answer.findAll({
      where: {
        session_level_id: session_level_id,
      },
      include: [
        {
          model: Question,
          attributes: ["question"],
        },
        {
          model: SessionLevel,
          attributes: ["level_id"],
          include: [
            {
              model: Level,
              attributes: ["level_name"],
            },
          ],
        },
      ],
    });
    if (answers.length === 0) {
      return res.status(404).json({
        status: false,
        msg: "No answers found for the provided session level ID",
      });
    }
    console.log(answers);
    return res.status(200).json({
      status: true,
      msg: "Get Answer By Session Level",
      answers: answers,
    });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};

exports.getAnswersByTopicAndLevel = async (req, res, next) => {
  try {
    const { topic_id, level_id, user_id, session_id } = req.query;

    if (!topic_id || !level_id || !user_id || !session_id) {
      return res.status(400).json({
        status: false,
        msg: "Topic ID, Level ID, user Id and session ID  are required in the request",
      });
    }

    const questions = await Question.findAll({
      where: {
        topic_id: topic_id,
        level_id: level_id,
      },
    });

    const extractedQuestions = questions.map((question) => question.get());

    const sessionLevel = await SessionLevel.findOne({
      where: {
        session_id: session_id,
        level_id: level_id,
      },
    });

    const answers = await Answer.findAll({
      where: {
        session_level_id: sessionLevel.id,
      },
    });

    const extractedAnswers = answers.map((answer) => answer.get());

    const mergedResult = extractedQuestions.map((question) => {
      const matchingAnswer = extractedAnswers.find(
        (answer) => answer.question_id === question.id
      );

      // If there is a matching answer, merge the data
      if (matchingAnswer) {
        return {
          question: question.question,
          suggested_answers: JSON.parse(question.suggested_answers),
          topic_id: question.topic_id,
          level_id: question.level_id,
          question_id: matchingAnswer.question_id,
          user_id: matchingAnswer.user_id,
          answer: matchingAnswer.answer,
          session_level_id: matchingAnswer.session_level_id,
        };
      }

      // If there is no matching answer, return the original question
      return question;
    });

    console.log("mergedResult", mergedResult);
    return res.status(200).json({
      status: true,
      msg: "Get Answers By Topic and Level",
      answers: mergedResult,
    });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};

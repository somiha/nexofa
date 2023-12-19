// const nlp = require("compromise");
// const sentiment = require("wink-sentiment");

// function analyzeText(text) {
//   const doc = nlp(text.toLowerCase());

//   const analysis = {
//     strengths: [],
//     weaknesses: [],
//     opportunities: [],
//     threats: [],
//   };

//   doc.sentences().forEach((sentence) => {
//     const text = sentence.text();

//     if (text.trim() !== "") {
//       const sentimentScore = sentiment(text).score;

//       if (sentimentScore > 0) {
//         if (text.includes("strength") || text.includes("advantage")) {
//           analysis.strengths.push(text);
//         } else if (text.includes("opportunity") || text.includes("potential")) {
//           analysis.opportunities.push(text);
//         }
//       } else if (sentimentScore < 0) {
//         if (text.includes("weakness") || text.includes("disadvantage")) {
//           analysis.weaknesses.push(text);
//         } else if (text.includes("threat") || text.includes("challenge")) {
//           analysis.threats.push(text);
//         }
//       }
//     }
//   });

//   return analysis;
// }

// const text = `1. Our company has a highly skilled and innovative team that consistently delivers high-quality products.
// 2. One of our weaknesses is our reliance on a single supplier for critical components.
// 3. The market is growing rapidly, providing us with excellent opportunities for expansion.
// 4. Intense competition in the industry poses a threat to our market share.
// 5. We face challenges in adapting to emerging technologies, which could be a weakness.
// 6. Economic downturns may impact consumer spending, posing a threat to our revenue.
// 7. Regulatory changes in the industry could create both challenges and opportunities for us.
// 8. Our strong brand presence gives us a competitive advantage in the market.
// 9. Limited market reach is a weakness that we need to address to maximize growth.
// 10. Partnerships with other businesses present opportunities for collaboration and growth.
// `;

// const result = analyzeText(text);

// console.log("SWOT Analysis:");
// console.log("Strengths:", result.strengths);
// console.log("Weaknesses:", result.weaknesses);
// console.log("Opportunities:", result.opportunities);
// console.log("Threats:", result.threats);

const { PythonShell } = require("python-shell");

function analyzeSwot(text) {
  return new Promise((resolve, reject) => {
    const options = {
      mode: "text",
      pythonPath: "python3",
      scriptPath: __dirname,
      args: [text],
    };

    PythonShell.run("sentiment_analysis.py", options, (err, result) => {
      if (err) {
        console.error("Error in Python script execution:", err);
        reject(err);
      } else {
        console.log("Python script output:", result);
        resolve(result[0]);
      }
    });
  });
}

async function run() {
  const text = `1. Our company has a highly skilled and innovative team that consistently delivers high-quality products.
2. One of our weaknesses is our reliance on a single supplier for critical components.
3. The market is growing rapidly, providing us with excellent opportunities for expansion.
4. Intense competition in the industry poses a threat to our market share.
5. We face challenges in adapting to emerging technologies, which could be a weakness.
6. Economic downturns may impact consumer spending, posing a threat to our revenue.
7. Regulatory changes in the industry could create both challenges and opportunities for us.
8. Our strong brand presence gives us a competitive advantage in the market.
9. Limited market reach is a weakness that we need to address to maximize growth.
10. Partnerships with other businesses present opportunities for collaboration and growth.`;

  const swotResult = await analyzeSwot(text);

  console.log("SWOT Analysis:");
  console.log(swotResult);
}

run();

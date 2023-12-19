const userRoute = require("./userRoute");
const sessionRoute = require("./sessionRoute");
const topicRoute = require("./topicRoute");
const levelRoute = require("./levelRoute");
const questionRoute = require("./questionRoute");
const answerRoute = require("./answerRoute");
const contactRoute = require("./contactUsRoute");
const packageRoute = require("./packageRoute");
const tryPackageRoute = require("./tryPackageRoute");
const infoRoute = require("./infoRoute");
const socialRoute = require("./socialRoute");
const adminRoute = require("./adminRoute/adminRoute");

const routes = [
  {
    path: "/api/auth",
    handler: userRoute,
  },
  {
    path: "/api/",
    handler: sessionRoute,
  },
  {
    path: "/api/",
    handler: topicRoute,
  },
  {
    path: "/api/",
    handler: levelRoute,
  },
  {
    path: "/api/question",
    handler: questionRoute,
  },
  {
    path: "/api/answer",
    handler: answerRoute,
  },
  {
    path: "/api/contact",
    handler: contactRoute,
  },
  {
    path: "/api/package",
    handler: packageRoute,
  },
  {
    path: "/api/try-package",
    handler: tryPackageRoute,
  },
  {
    path: "/api/info",
    handler: infoRoute,
  },
  {
    path: "/api/social",
    handler: socialRoute,
  },
  {
    path: "",
    handler: adminRoute,
  },
  // {
  //   path: "/",
  //   handler: (req, res) => {
  //     return res.json({ msg: "welcome to my application" });
  //   },
  // },
];

module.exports = (app) => {
  routes.forEach((r) => {
    if (r.path == "/") {
      app.get(r.path, r.handler);
    } else {
      app.use(r.path, r.handler);
    }
  });
};

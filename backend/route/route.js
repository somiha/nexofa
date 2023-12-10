const userRoute = require("./userRoute");
const sessionRoute = require("./sessionRoute");
const topicRoute = require("./topicRoute");

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
    path: "/",
    handler: (req, res) => {
      return res.json({ msg: "welcome to my application" });
    },
  },
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

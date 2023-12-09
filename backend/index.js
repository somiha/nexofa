const express = require("express");
const dotenv = require("dotenv");
const setMiddleware = require("./middleware/middleware");
const setRoute = require("./route/route");

const app = express();
dotenv.config();

setMiddleware(app);
setRoute(app);

require("./model/database");

app.listen(8000, () => {
  console.log("Localhost is on : 8000 port");
});

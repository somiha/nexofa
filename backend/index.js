const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const setMiddleware = require("./middleware/middleware");
const setRoute = require("./route/route");

const app = express();
dotenv.config();

setMiddleware(app);
setRoute(app);
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/images", express.static(__dirname + "public/images"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views");
require("./model/database");

app.listen(8000, () => {
  console.log("Localhost is on : 8000 port");
});

import express from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import path from "path";


import * as indexController from "./controllers/index";
import * as loginController from "./controllers/login";
import * as mapController from "./controllers/map";
import * as mobileController from "./controllers/mobile";
import * as profileController from "./controllers/profile";
import * as settingController from "./controllers/setting";
import * as signupController from "./controllers/signup";
import * as timelineController from "./controllers/timeline";
const app = express();

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", indexController.index);
app.get("/login", loginController.index);
app.get("/map", mapController.index);
app.get("/mobile", mobileController.index);
app.get("/profile", profileController.index);
app.get("/setting", settingController.index);
app.get("/signup", signupController.index);
app.get("/timeline", timelineController.index);

app.post("/trysignup", signupController.signup);
app.post("/trylogin", loginController.login);

app.use(
  express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

export default app;

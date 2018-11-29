import express from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import path from "path";


import * as indexController from "./controllers/index";
import * as loginController from "./controllers/login";
import * as logoutController from "./controllers/logout";
import * as mapController from "./controllers/map";
import * as tdmapController from "./controllers/2dmap";
import * as mobileController from "./controllers/mobile";
import * as profileController from "./controllers/profile";
import * as settingController from "./controllers/setting";
import * as signupController from "./controllers/signup";
import * as timelineController from "./controllers/timeline";
import * as subscribeController from "./controllers/subscribe";
import * as opensourcesController from "./controllers/opensources";

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", indexController.index);
app.get("/login", loginController.index);
app.get("/logout", logoutController.logout);
app.get("/map", mapController.index);
app.get("/2dmap", tdmapController.index);
app.get("/mobile", mobileController.index);
app.get("/profile", profileController.index);
app.get("/setting", settingController.index);
app.get("/signup", signupController.index);
app.get("/timeline", timelineController.index);
app.get("/subscribe", subscribeController.index);
app.get("/opensources", opensourcesController.index);

app.post("/trysignup", signupController.signUp);
app.post("/trylogin", loginController.login);

app.post("/trypost", timelineController.post);
app.post("/trycomment", timelineController.comment);
app.post("/tryfollow", timelineController.follow);
app.post("/trylike", timelineController.like);
app.post("/goprofile", timelineController.goprofile);

app.post("/changesetting", settingController.changesetting);
app.post("/requestfind", subscribeController.finduser);
app.post("/requestadd", subscribeController.subscribe);

app.post("/editpost", timelineController.editpost);
app.post("/deletepost", timelineController.deletepost);


app.use(
  express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

export default app;

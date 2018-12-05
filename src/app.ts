import express from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import path from "path";


import * as indexController from "./controllers/index";
import * as mapController from "./controllers/map";
import * as tdmapController from "./controllers/2dmap";
import * as mobileController from "./controllers/mobile";
import * as profileController from "./controllers/profile";
import * as settingController from "./controllers/setting";
import * as signInController from "./controllers/signIn";
import * as signUpController from "./controllers/signUp";
import * as timelineController from "./controllers/timeline";
import * as subscribeController from "./controllers/subscribe";
import * as opensourcesController from "./controllers/opensources";
import { isRegExp } from "util";

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.get("/", indexController.index);
app.get("/login", signInController.index);
app.get("/map", mapController.index);
app.get("/2dmap", tdmapController.index);
app.get("/mobile", mobileController.index);
app.get("/profile", profileController.index);
app.get("/setting", settingController.index);
app.get("/signUp", signUpController.index);
app.get("/timeline", timelineController.index);
app.get("/subscribe", subscribeController.index);
app.get("/opensources", opensourcesController.index);

app.post("/submitSignUp", signUpController.signUp);

app.post("/submitLogin", signInController.submitLogin);
app.post("/submitLogout", signInController.submitLogout);

app.post("/createPost", timelineController.createPost);
app.post("/editpost", timelineController.editPost);
app.post("/delPost", timelineController.delPost);

app.post("/submitComments", timelineController.comment);
app.post("/delComments", timelineController.delComments);

app.post("/submitLike", timelineController.like);

app.post("/tryfollow", timelineController.follow);

app.get(/profile/, profileController.goProfile);

app.post("/changesetting", settingController.changesetting);
app.post("/requestfind", subscribeController.finduser);
app.post("/requestadd", subscribeController.subscribe);
app.post("/changeProfileImg", profileController.changeProfileImg);

app.use(
  express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

export default app;

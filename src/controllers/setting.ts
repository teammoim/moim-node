import { Request, Response } from "express";
import * as firebase from "firebase";
const dbconfig = require("../../fbconfig.js");
export default !firebase.apps.length ? firebase.initializeApp(dbconfig) : firebase.app();
const auth = firebase.auth();
export let index = (req: Request, res: Response) => {
  res.render("user/setting", {
    title: "Home"
  });
};
export let changesetting = (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  const phone = req.body.phonenumber;
  const realname = req.body.name;
  const nickname = req.body.nickname;
  const birth = req.body.birthdate;
  const gender = req.body.chk_info;
  const intro = req.body.intro;
};
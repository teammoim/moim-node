import { Request, Response } from "express";
import * as firebase from "firebase";
const dbconfig = require("../../fbconfig.js");
export default !firebase.apps.length ? firebase.initializeApp(dbconfig) : firebase.app();
const timelines = firebase.database();
const auth = firebase.auth();

export let index = (req: Request, res: Response) => {
  const curruser = auth.currentUser;
  let islogin: boolean = false;
  if (curruser) islogin = true;
  res.render("index/index", {
    title: (auth.currentUser != undefined) ? auth.currentUser.displayName : "회원님!",
    islogin: islogin
  });
};

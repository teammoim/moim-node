import { Request, Response } from "express";
import * as firebase from "firebase";
const dbconfig = require("../../fbconfig.js");
export default !firebase.apps.length ? firebase.initializeApp(dbconfig) : firebase.app();
const auth = firebase.auth();
export let index = (req: Request, res: Response) => {
  const curruser = auth.currentUser;
  let islogin: boolean = false;
  if (curruser) islogin = true;
  res.render("timeline/mobile", {
    title: "Home",
    islogin: islogin
  });
};

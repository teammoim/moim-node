import { Request, Response } from "express";
import * as firebase from "firebase";
const dbconfig = require("../../fbconfig.js");
export default !firebase.apps.length ? firebase.initializeApp(dbconfig) : firebase.app();
const timelines = firebase.database();
const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");


export let index = (req: Request, res: Response) => {
    const you = firebase.auth().currentUser;
    const yourmail = you.email;
    // const yournickname = you.displayName;
  res.render("user/profile", {
    title: "Home"
  });
};

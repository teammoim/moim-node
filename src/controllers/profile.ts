import { Request, Response } from "express";
import * as firebase from "firebase";
const dbconfig = require("../../fbconfig.js");
export default !firebase.apps.length ? firebase.initializeApp(dbconfig) : firebase.app();
const timelines = firebase.database();

export let index = (req: Request, res: Response) => {
    const you = firebase.auth().currentUser;
    if (!you) {
        console.log("You have not logged");
        res.send();
    }
    const yourmail = you.email;
    // const yournickname = you.displayName;
  res.render("user/profile", {
    title: "Home",
    email: yourmail
  });
};

import { Request, Response } from "express";
import bodyParser from "body-parser";

// Initialize firebase
import * as firebase from "firebase";
const dbconfig = require("../../fbconfig.js");
export default !firebase.apps.length ? firebase.initializeApp(dbconfig) : firebase.app();
const timelines = firebase.database();

export let index = (req: Request, res: Response) => {
  res.render("user/signup", {
    title: "Home"
  });
};
export let signup = (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  const nickname = req.body.nickname;

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userData) => {
      const tempuid = userData.user.uid;
      userData.user.displayName = nickname;
      timelines.ref("/users/" + tempuid).set({
          email: userData.user.email,
          name: userData.user.displayName,
          uid: tempuid
      });
  })
  .catch(function (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
  });

  res.redirect("/");
};

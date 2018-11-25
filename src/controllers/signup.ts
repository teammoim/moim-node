import { Request, Response } from "express";
import bodyParser from "body-parser";

// Initialize firebase
import * as firebase from "firebase";
const dbconfig = require("../../fbconfig.js");
export default !firebase.apps.length ? firebase.initializeApp(dbconfig) : firebase.app();
const timelines = firebase.database();
const auth = firebase.auth();

export let index = (req: Request, res: Response) => {
  res.render("user/signup", {
    title: "Home"
  });
};

export let signup = (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  const phonenum = req.body.phonenum;
  const realname = req.body.realname;
  const nickname = req.body.nickname;
  const birth = req.body.birthdate;
  const gender = req.body.chk_info;
  const gotlist: string[] = [email, password, phonenum, realname, nickname, birth, gender];

  for (let i = 0; i < gotlist.length; i++) {
      if (gotlist[i] == "" || gotlist[i] == undefined) {
          res.redirect("/signup");
      }
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userData) => {
      userData.additionalUserInfo.username = nickname;

      if (userData) {
          timelines.ref("/users/" + userData.user.uid).set({
              birthday: birth,
              email: userData.user.email,
              name: realname,
              nickname: nickname,
              gender: gender,
              phone: phonenum,
              uid: userData.user.uid,
              intro: "",
              follow: {}
          });
          userData.user.updateProfile({
              displayName: nickname,
              photoURL: ""
          });
      }
      else {
      }
  })
  .catch(function (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode + " " + errorMessage);
    res.redirect("/signup");
  });

  res.redirect("/login");
};

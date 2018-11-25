import { Request, Response } from "express";
import express from "express";

// Initialize firebase
import * as firebase from "firebase";
const dbconfig = require("../../fbconfig.js");
export default !firebase.apps.length ? firebase.initializeApp(dbconfig) : firebase.app();
const auth = firebase.auth();

export let index = (req: Request, res: Response) => {
  res.render("user/login", {title: "Home"});
};

export let login = (req: Request, res: Response) => {
    if (!!auth.currentUser) {
        res.redirect("/profile");
    }
  const email = req.body.email;
  const password = req.body.password;
  auth.signInWithEmailAndPassword(email, password).then((user) => {
      res.redirect("/profile");
  })
  .catch(function (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode + " " + errorMessage);
    res.send("로그인 실패! 다시 시도해주십시오.");
});
};

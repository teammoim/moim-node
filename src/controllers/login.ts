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
  const promise = auth.signInWithEmailAndPassword(email, password);

  promise.catch(function (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode + " " + errorMessage);
});

  auth.onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        res.redirect("/profile");
      }
      else {
        // No user is signed in.
        res.redirect("/login");
      }
  });
};

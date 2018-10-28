import { Request, Response } from "express";
import express from "express";

// Initialize firebase
import * as firebase from "firebase";
const dbconfig = require("../../fbconfig.js");
export default !firebase.apps.length ? firebase.initializeApp(dbconfig) : firebase.app();
const timelines = firebase.database();
const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

export let index = (req: Request, res: Response) =>
{
  res.render("user/login", {title: "Home"});
};

export let login = (req: Request, res: Response) =>
{
  const email = req.body.email;
  const password = req.body.password;

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error)
  {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    const user = firebase.auth().currentUser;
  });

  // const user = firebase.auth().currentUser;
  // console.log(user);

  res.redirect("/profile");
};

export let loginProvider = (req: Request, res: Response) =>
{
  res.render("user/login", {title: "Home"});
  firebase.auth().signInWithPopup(provider).then(function (result) {
    firebase.auth().currentUser.getIdToken(true).then(function (idToken) {
      const token = idToken;
      const user = result.user;
      console.log(user + token);
    }).catch(function (error) {
      // Handle error
    });
    // This gives you a Google Access Token. You can use it to access the Google API.
    // The signed-in user info.
    // ...
  }).catch(function (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    const credential = error.credential;
    console.log(errorCode + errorMessage + email + credential);
    // ...
  });
};

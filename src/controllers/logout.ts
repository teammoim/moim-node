import { Request, Response } from "express";
import express from "express";

// Initialize firebase
import * as firebase from "firebase";
const dbconfig = require("../../fbconfig.js");
export default !firebase.apps.length ? firebase.initializeApp(dbconfig) : firebase.app();
const auth = firebase.auth();

export let logout = (req: Request, res: Response) => {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      res.redirect("/login");
    }, function(error) {
      // An error happened.
      res.redirect("/");
    });
};

import { Request, Response } from "express";
import express from "express";

// Initialize firebase
import * as firebase from "firebase";
const dbconfig = require("../../fbconfig.js");
export default !firebase.apps.length ? firebase.initializeApp(dbconfig) : firebase.app();
const auth = firebase.auth();

export let logout = (req: Request, res: Response) => {

    if (auth.currentUser) {
        auth.signOut().then(function() {
          // Sign-out successful.
          res.redirect("/");
        }, function(error) {
          // An error happened.
          res.send("로그아웃 중 알 수 없는 오류가 발생했습니다.");
        });
    } else {
        res.send("유저가 로그인하지 않았습니다.");
    }
};

import { Request, Response } from "express";
import express from "express";

/* Initialize firebase */
import * as firebase from "firebase";
const firebase_config: any = require("../../fbconfig.js");
export default !firebase.apps.length ? firebase.initializeApp(firebase_config) : firebase.app();
const auth = firebase.auth();

const DEBUG_FLAG = true;

export let index = (req: Request, res: Response) => {
    res.render("user/login", {title: "Home"});
};

/**
 * @param req
 * @param res
 *  1. Login Success
 *  2. Login Failed
 */

export let submitLogin = (req: Request, res: Response) => {
    if (!!auth.currentUser) {
        res.redirect("/"); // go to intro
    }
    const email = req.body.email;
    const password = req.body.password;
    auth.signInWithEmailAndPassword(email, password).then((user) => {
        res.redirect("/"); // go to intro
    }).catch(function (error) {
        if (DEBUG_FLAG) {
            console.log(error.code + " " + error.message);
        }
        res.send(2);
    });
};

export let submitLogout = (req: Request, res: Response) => {
    if (auth.currentUser) {
        auth.signOut().then(function() {
            res.redirect("/");
        }, function(error) {
            res.send("로그아웃 중 알 수 없는 오류가 발생했습니다.");
        });
    } else {
        console.log("You have not logged");
        res.redirect("/");
    }
};



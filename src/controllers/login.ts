import { Request, Response } from "express";
import express from "express";

/* Initialize firebase */
import * as firebase from "firebase";
const dbconfig: any = require("../../fbconfig.js");
export default !firebase.apps.length ? firebase.initializeApp(dbconfig) : firebase.app();
const auth = firebase.auth();

const DEBUG_MODE = false;

export let index = (req: Request, res: Response) => {
    res.render("user/login", {title: "Home"});
};

/**
 * @param req
 * @param res
 *  1. Login Success
 *  2. Login Failed
 */

export let login = (req: Request, res: Response) => {
    if (!!auth.currentUser) {
        res.redirect("/profile");
    }
    const email = req.body.email;
    const password = req.body.password;
    auth.signInWithEmailAndPassword(email, password).then((user) => {
        res.redirect("/profile");
    }).catch(function (error) {
        if (DEBUG_MODE) {
            console.log(error.code + " " + error.message);
        }
        res.send(2);
    });
};
import { Request, Response } from "express";
import * as firebase from "firebase";
const dbconfig = require("../../fbconfig.js");
export default !firebase.apps.length ? firebase.initializeApp(dbconfig) : firebase.app();
const timelines = firebase.database();

export let index = (req: Request, res: Response) => {
    const curruser = firebase.auth().currentUser;
    if (!curruser) {
        console.log("you have not logged");
        res.redirect("/login");
    }
    else {
        const currusermail = curruser.email;
        res.render("user/profile", {
          title: "Home",
          email: currusermail
        });
    }
};

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
        timelines.ref("/users/" + curruser.uid).once("value").then((snapshot) => {
        if (!snapshot.val()) {
            timelines.ref("/users/" + curruser.uid).set({
                email: curruser.email,
                name: (curruser.displayName) ? curruser.displayName : "Nonamed",
                uid: curruser.uid
            });
        }
    });
        const currusermail = curruser.email;
        res.render("user/profile", {
          title: "Home",
          email: currusermail
        });
    }
};

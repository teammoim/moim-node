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
        // Valid the user have correct json data.
        timelines.ref("/users/" + curruser.uid).once("value").then((snapshot) => {

        console.log(snapshot);

        // if (!snapshot.val()) {
        //     timelines.ref("/users/" + curruser.uid).set({
        //         birthday: "Undetected",
        //         email: curruser.email,
        //         name: "Unvaliduser" ,
        //         nickname: (curruser.displayName) ? curruser.displayName : "Unvaliduser",
        //         gender: "Notdefiend",
        //         phonenumber: "Notvalid",
        //         uid: curruser.uid
        //     });
        // }
    });

        const currusermail = curruser.email;
        res.render("user/profile", {
          title: "Home",
          email: currusermail;
          //if you want to show user information, write here
          //and need timeline posts 
        });
    }
};

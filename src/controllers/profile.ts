import { Request, Response } from "express";
import * as firebase from "firebase";

const dbconfig = require("../../fbconfig.js");
export default !firebase.apps.length ? firebase.initializeApp(dbconfig) : firebase.app();
const timelines = firebase.database();

function dataChecker(target: string) {
    const check = JSON.parse(target);

    Object.keys(check).forEach((k) => {
        if (check[k] === "" || check[k] === undefined) { return false; }
    });

    return true;
}

export let index = (req: Request, res: Response) => {
    const curruser = firebase.auth().currentUser;
    if (!curruser) {
        console.log("you have not logged");
        res.redirect("/login");
    } else {
        // Valid the user have correct json data.
        timelines.ref("/users/" + curruser.uid).once("value").then((snapshot) => {
        console.log(snapshot.val());

        if (!dataChecker(JSON.stringify(snapshot.val()))) {
            // Some data not written
            console.log("User infomation saved not correctly");
            console.log(snapshot.val());
            res.redirect("/setting");
        } else {
            // All data saved to DB correctly
            const printingname = curruser.displayName;

            res.render("user/profile", {
              title: "Home",
              name: printingname
            });
        }
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
    }).catch((error) => {
    console.log(error);
});
    }
};

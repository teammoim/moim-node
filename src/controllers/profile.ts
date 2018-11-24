import { Request, Response } from "express";
import * as firebase from "firebase";
const dbconfig = require("../../fbconfig.js");
export default !firebase.apps.length ? firebase.initializeApp(dbconfig) : firebase.app();
const timelines = firebase.database();

function dataChecker(target: string) {
    const check = JSON.parse(target);
    let flag = true;

    if (check.birthday == "" || check.birthday == undefined) {
        flag = false;
    }
    else if (check.email == "" || check.email == undefined) {
        flag = false;
    }
    else if (check.gender == "" || check.gender == undefined) {
        flag = false;
    }
    else if (check.name == "" || check.name == undefined) {
        flag = false;
    }
    else if (check.nickname == "" || check.nickname == undefined) {
        flag = false;
    }
    else if (check.phonenumber == "" || check.phonenumber == undefined) {
        flag = false;
    }
    else if (check.uid == "" || check.uid == undefined) {
        flag = false;
    }
    return flag;
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
            res.redirect("/changesetting");
        } else {
            // All data saved to DB correctly

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
    });

    const printingname = (curruser.displayName == "" || curruser.displayName == undefined) ? curruser.email : curruser.displayName;

    res.render("user/profile", {
      title: "Home",
      name: printingname
    });
    }
};

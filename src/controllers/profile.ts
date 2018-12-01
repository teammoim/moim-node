import { Request, Response } from "express";
import * as firebase from "firebase";

const dbconfig = require("../../fbconfig.js");
export default !firebase.apps.length ? firebase.initializeApp(dbconfig) : firebase.app();
const timelines = firebase.database();
const auth = firebase.auth();

function dataChecker(target: string) {
    const check = JSON.parse(target);

    Object.keys(check).forEach((k) => {
        if (check[k] === undefined) { return false; }
    });

    return true;
}

export let index = (req: Request, res: Response) => {
    const curruser = auth.currentUser;
    if (!curruser) {
        console.log("you have not logged");
        res.redirect("/login");
    } else {
      // Valid the user have correct json data.
        timelines.ref("/users/" + curruser.uid).once("value").then((snapshot) => {
        const userData = snapshot.val();
        console.log(userData);
        if (!dataChecker(JSON.stringify(snapshot.val()))) {
            // Some data not written
            console.log("User infomation saved not correctly");
            console.log(snapshot.val());
            res.redirect("/setting");
        } else {
            // All data saved to DB correctly
          const name = userData.name;
            res.render("user/profile", {
              title: "Home",
              name: name,
              isfollow: "me", // "true","false","me"
              uid : "" // not need uid
            });
        }

        // rendering here

    }).catch((error) => {
    console.log(error);
});
    }
};

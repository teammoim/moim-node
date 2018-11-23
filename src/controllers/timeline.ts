import { Request, Response } from "express";
import * as firebase from "firebase";
const dbconfig = require("../../fbconfig.js");
export default !firebase.apps.length ? firebase.initializeApp(dbconfig) : firebase.app();
const auth = firebase.auth();
const timelines = firebase.database();

export let index = (req: Request, res: Response) => {
    if (!auth.currentUser) {
        res.redirect("/login");
    }
    else {
        // contents have json object of timline
        const contents: object[] = [];
        timelines.ref("/timeline/").once("value", (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const child = childSnapshot.val();
                contents.push(child);
            });
            console.log(contents);
        });
    }

  res.render("timeline/timeline", {
    title: "Home"
  });
};

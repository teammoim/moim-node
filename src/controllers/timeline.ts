import { Request, Response } from "express";
import * as firebase from "firebase";
import { log } from "async";
const dbconfig = require("../../fbconfig.js");
export default !firebase.apps.length ? firebase.initializeApp(dbconfig) : firebase.app();
const auth = firebase.auth();
const timelines = firebase.database();

export let index = (req: Request, res: Response) => {
    /*if (!auth.currentUser) {
        res.redirect("/login");
    }
    else {
        // tl have json object of timline
        const tl: object[] = [];
        timelines.ref("/timeline/").once("value", (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const child = childSnapshot.val();
                tl.push(child);
            });
            // console.log(tl);
        });
    }*/

  res.render("timeline/timeline", {
    title: "Home"
    /* to-do
     * give client to DB JSON Data
     * hope variable name is contents
       contents : JSON */
  });
};
export let post = (req: Request, res: Response) => {
  const text = req.body.text;
  // const imageurls = req.body.images.split(","); // not made
};
export let comment = (req: Request, res: Response) => {
  const text = req.body.text;
  const postid = req.body.postid;
};
export let follow = (req: Request, res: Response) => {
  const uid = req.body.uid;
};
export let like = (req: Request, res: Response) => {
  const postid = req.body.postid;
};
export let goprofile = (req: Request, res: Response) => {
  const uid = req.body.uid;
};
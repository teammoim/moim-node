import { Request, Response } from "express";
import * as firebase from "firebase";
const dbconfig = require("../../fbconfig.js");
export default !firebase.apps.length ? firebase.initializeApp(dbconfig) : firebase.app();
const auth = firebase.auth();
const timelines = firebase.database();

export let index = (req: Request, res: Response) => {
    if (!auth.currentUser) {
        console.log("You have not logged");
        res.redirect("/login");
    } else {
        // contents have json object of timline
        const contents: object[] = [];
        timelines.ref("/posts/").once("value", (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const child = childSnapshot.val();
                contents.push(child);
            });
            // contents will have many data
            // console.log(contents);
        });
    }

    res.render("timeline/timeline", {
       title: "Home"
       /* to-do
        * give client to DB JSON Data
        /* client need...
          user의 JSON DATA
          [timeline.ejs] follow한 친구들의 Post JSON DATA
          [profile.ejs] 내가 쓴 Post JSON DATA
     */
     });

};
   // writing post
   export let post = (req: Request, res: Response) => {
     const text = req.body.text;
   };
  // writing comment at post
   export let comment = (req: Request, res: Response) => {
     const text = req.body.text;
     const postid = req.body.postid;
   };
 // follow button click
   export let follow = (req: Request, res: Response) => {
     const uid = req.body.uid;
   };
 // like button click
   export let like = (req: Request, res: Response) => {
     const postid = req.body.postid;
   };
 // go profile page of clicked user
   export let goprofile = (req: Request, res: Response) => {
     const uid = req.body.uid;
   };

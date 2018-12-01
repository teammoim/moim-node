import { Request, Response } from "express";
import * as firebase from "firebase";
const firebase_config = require("../../fbconfig.js");
export default !firebase.apps.length ? firebase.initializeApp(firebase_config) : firebase.app();
const auth = firebase.auth();
const firebase_db = firebase.database();

export let index = (req: Request, res: Response) => {
    if (auth.currentUser) {
        // contents have json object of timline
        const contents: object[] = [];
        firebase_db.ref("/posts/").once("value", (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const child = childSnapshot.val();
                contents.push(child);
            });
            // contents will have many data
            // console.log(contents);
        });
    } else {
        console.log("You have not logged");
        res.redirect("/login");
    }

    res.render("timeline/timeline", {
      title: "Home",
      contents: "{'number':123,'name':good}"
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
     const uid = "0TOUAVT4zXb4AFC98A3PkqZFCxi1"; // req.body.uid sample
     const isfollow = "true";
     timelines.ref("/users/" + uid).once("value").then(function (snapshot) {
       const userData = snapshot.val();
       const tmp_name = userData.name;

       res.render("user/profile", {
         title: "Home",
         name: tmp_name,
         isfollow: "true", // isfollow = "true","false","me"
         uid: uid
       });
     });
};
export let editpost = (req: Request, res: Response) => {
  const postid = req.body.postid;
  const text = req.body.text;
};
export let deletepost = (req: Request, res: Response) => {
  const postid = req.body.postid;
};


import { Request, Response } from "express";
import * as firebase from "firebase";
const firebase_config = require("../../fbconfig.js");
export default !firebase.apps.length ? firebase.initializeApp(firebase_config) : firebase.app();
const auth = firebase.auth();
const firebase_db = firebase.database();

export let index = (req: Request, res: Response) => {
    if (auth.currentUser) {
        const contents: object[] = [];
        firebase_db.ref("/posts/").once("value", (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const child = childSnapshot.val();
                contents.push(child);
            });
        });
    } else {
        console.log("You have not logged");
        res.redirect("/login");
    }

    res.render("timeline/timeline", {
      title: "Home",
      contents: "{'number':123,'name':good}"
        });
    };

   export let post = (req: Request, res: Response) => {
     const text = req.body.text;
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
       const uid = "0TOUAVT4zXb4AFC98A3PkqZFCxi1"; // req.body.uid sample
       firebase_db.ref("/users/" + uid).once("value").then(function (snapshot) {
           const userData = snapshot.val();
           res.render("user/profile", {
               title: "Home",
               name: userData.name,
               uid: uid
           });
       });
   };

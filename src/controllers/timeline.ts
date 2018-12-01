import { Request, Response } from "express";

/* Firebase Initialized */
import * as firebase from "firebase";
const firebase_config = require("../../fbconfig.js");
export default !firebase.apps.length ? firebase.initializeApp(firebase_config) : firebase.app();
const auth = firebase.auth();
const firebase_db = firebase.database();

/* Userspace variable Initialize */
const serverDate = new Date();
const DEBUG_FLAG = true;

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

export let createPost = (req: Request, res: Response) => {
    const post_text = req.body.text;
    const img_url = req.body.img_url;

    const newPostKey = firebase_db.ref().child("posts").push().key;

    firebase_db.ref("/posts/" + newPostKey).set({
        postId: newPostKey,
        text: post_text,
        uid: auth.currentUser.uid,
        timestamp: serverDate.getTime(),
        img_url: img_url // img_url_Array
    }).catch(function(error) {
        if (!error) {
            // data submit successfully
        } else {
            if (DEBUG_FLAG) {
                console.log(error.code + " , " + error.message);
            }
        }
    });
};

export let delPost = (req: Request, res: Response) => {
    const postId = req.body.postId;
    firebase_db.ref("/posts/" + postId).once("value").then(function(data) {
        if (data != undefined) {
            firebase_db.ref("posts/" + postId).remove();
            // Delete Complete alert
        } else {
            console.log("Data is undefined");
        }
    }).catch(function (error) {
        if (!error) {
            // Delete Successfully !
        } else {
            if (DEBUG_FLAG) {
                console.log(error.code + " , " + error.message);
            }
        }
    });
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

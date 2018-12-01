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
        firebase_db.ref("/post/").once("value", (snapshot) => {
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
  // const img_url = req.body.img_url;


    const newPostKey = firebase_db.ref().child("post").push().key;

    firebase_db.ref("/post/" + auth.currentUser.uid + "/" + newPostKey).set({
        postId: newPostKey,
        text: post_text,
        uid: auth.currentUser.uid,
        timestamp: serverDate.getTime(),
        // img_url: img_url // img_url_Array
    }).catch(function(error) {
        if (!error) {
            // data submit successfully
        } else {
            if (DEBUG_FLAG) {
                console.log(error.code + " , " + error.message);
            }
        }
    });
    res.redirect("/profile");
};

export let delPost = (req: Request, res: Response) => {
    const postId = req.body.postId;
    firebase_db.ref("/post/" + postId).once("value").then(function(data) {
        if (data != undefined) {
            firebase_db.ref("post/" + postId).remove();
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
    const postId = req.body.postid;
    const writerUid = req.body.writerUid;
    const comments_text = req.body.text;

    const newCommentsKey = firebase_db.ref("/post/" + postId).child("comments").push().key;

    firebase_db.ref("/post/" + postId).child("/comments/" + newCommentsKey).set({
        commentsId: newCommentsKey,
        comments: comments_text,
        timestamp: serverDate.getTime(),
        writerUid: writerUid,
    }).catch(function(error) {
        if (DEBUG_FLAG) {
            console.log(error.code + " , " + error.message);
        }
    });
};

export let delComments = (req: Request, res: Response) => {
    const postId = req.body.postId;
    const commentsId = req.body.commentsId;
    firebase_db.ref("/post/" + postId).child("/comments/" + commentsId).once("value").then(function(data) {
        if (data != undefined) {
            firebase_db.ref("/post/" + postId).child("/comments/" + commentsId).remove();
        } else {
            console.log("Data is undefined");
        }
    }).catch(function (error) {
        if (!error) {
            // Delete Successfully !
        } else {
            console.log(error.code + " , " + error.message);
        }
    });
};

   export let follow = (req: Request, res: Response) => {
     const uid = req.body.uid;
   };

export let like = (req: Request, res: Response) => {
    const postId = req.body.post_id;
    const uid = req.body.uid;
    let tmp_likes = "";

    firebase_db.ref("/post/" + postId).child("likes")
        .once("value").then(function (data) {
        const JsonData = data.val();
        if (JsonData.likes_list.length > 0) {
            tmp_likes =  JsonData.likes_list + "," + uid;
        }
    }).catch(function(error) {
        console.log(error.code + " , " + error.message);
    });

    firebase_db.ref("/post/" + postId).set({
        postId: postId,
        likes_list: tmp_likes
    }).catch(function (error) {
        console.log(error.code + " , " + error.message);
    });
    res.send(505);
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

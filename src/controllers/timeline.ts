import { Request, Response } from "express";

/* Firebase Initialized */
import * as firebase from "firebase";
import { Promise } from "bluebird";
import { resolve } from "path";

const firebase_config = require("../../fbconfig.js");
export default !firebase.apps.length ? firebase.initializeApp(firebase_config) : firebase.app();
const auth = firebase.auth();
const firebase_db = firebase.database();

/* Userspace variable Initialize */
// const serverDate = new Date(); 서버키는 동안 항상 같은 serverdate로 표시 그래서 이런 전역변수 쓰면 안됨
const DEBUG_FLAG = true;


export let index = (req: Request, res: Response) => {
  if (!auth.currentUser) {
    console.log("You have not logged");
    res.redirect("/login");
  } else {
    let userData: any;
    let subsinfo: any = {}; // JSON
    const postinfo: any = {};
    let name: any; // String
    const currentuid = auth.currentUser.uid;
    firebase_db.ref("/users/" + currentuid).once("value", (snapshot) => {
      userData = snapshot.val();
      console.log(userData);
      const subPromises: any[] = [];
      const subs = userData.subscribe;
      name = userData.name;
      if (subs !== undefined) {
        Object.keys(subs).forEach((subid) => {
          subPromises.push(new Promise((resolve) => {
            firebase_db.ref("/users/" + subid).once("value").then((subshot) => {
              const subuser = subshot.val();
              console.log(subuser);
              subsinfo[subid] = {
                uid: subid,
                name: subuser["name"],
                photourl: subuser["url"]
              };
              resolve(subsinfo[subid]);
            }).catch((error) => {
              console.log(error);
              resolve();
            });
          }));
        });
      }
      else {
        subsinfo = "";
      }
      Promise.all(subPromises).thenReturn();
    }).catch((error) => {
      console.log(error);
    }).then(() => {
      firebase_db.ref("/post/").once("value").then((uidshot) => {
        const posts = uidshot.val();
        Object.keys(subsinfo).forEach((skey) => {
          Object.keys(uidshot.val()).forEach((ukey) => {
            if (skey == ukey) {
              const post = posts[ukey];
              const sub = subsinfo[skey];
              Object.keys(post).forEach((pkey) => {
                postinfo[pkey] = post[pkey];
                postinfo[pkey].name = sub.name;
                postinfo[pkey].photourl = sub.photourl;
              });
            }
          });
        });
      }).catch((error) => {
        console.log(error);
      }).then(() => {
        const postPromises: any[] = [];
        Object.keys(postinfo).forEach((pkey) => {
          postPromises.push(new Promise((resolvePost) => {
            const comPromises: any[] = [];
            const commentsinfo = postinfo[pkey].comments;
            if (commentsinfo !== undefined) {
              Object.keys(commentsinfo).forEach((ckey) => {
                const commentsuid = commentsinfo[ckey].uid;
                comPromises.push(new Promise((resolve) => {
                  firebase_db.ref("/users/" + commentsuid).once("value").then((commentshot) => {
                    const comuserinfo = commentshot.val();
                    commentsinfo[ckey].name = comuserinfo["name"];
                    commentsinfo[ckey].photourl = comuserinfo["url"];
                    resolve(commentsinfo[ckey]);
                  }).catch((error) => {
                    console.log(error);
                    resolve();
                  });
                }));

              });
            }
            Promise.all(comPromises).then(() => {
              resolvePost(postinfo[pkey]);
            });
          }));
        });
        Promise.all(postPromises).then(() => {
          res.render("timeline/timeline", {
            title: "Home",
            name: name,
            isfollow: "me", // "true","false","me"
            uid: currentuid, // need uid
            subscribes: subsinfo,
            you: userData, // not need uid
            youpost: postinfo,
          });
        });
      });
    });
  }
};

export let createPost = (req: Request, res: Response) => {
    const post_text = req.body.text;
    const img_url = req.body.img_url;

    const newPostKey = new Date().getTime();

    firebase_db.ref("/post/" + auth.currentUser.uid + "/" + newPostKey).set({
        postId: newPostKey.toString(),
        text: post_text,
        uid: auth.currentUser.uid,
        url: img_url // img_url_Array
    }).catch(function (error) {
        if (!error) {
            // data submit successfully
        } else {
            if (DEBUG_FLAG) {
                console.log(error.code + " , " + error.message);
            }
        }
    });
    res.redirect("back");
};

export let editPost = (req: Request, res: Response) => {
  const postId = req.body.postId;
  const text = req.body.text; // textarea value
  const dbaccess = firebase_db.ref("post/" + auth.currentUser.uid + "/" + postId);
  dbaccess.update({ text: text });
  res.redirect("back");
};

export let delPost = (req: Request, res: Response) => {
    const postId = req.body.postId;
    firebase_db.ref("/post/" + auth.currentUser.uid + "/" + postId).once("value").then(function (data) {
        if (data != undefined) {
            firebase_db.ref("post/" + auth.currentUser.uid + "/" + postId).remove();
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
  res.redirect("back");
};

export let comment = (req: Request, res: Response) => {
    const postId = req.body.postId;
    const comments_text = req.body.text;
    const newCommentsKey = new Date().getTime();
    const uid = req.body.uid;
    const currentuid = auth.currentUser.uid;

    firebase_db.ref("/post/" + uid + "/" + postId).child("/comments/" + newCommentsKey).set({
        text: comments_text,
        uid: currentuid,
    }).catch(function (error) {
        if (DEBUG_FLAG) {
            console.log(error.code + " , " + error.message);
        }
    });
  if (currentuid != uid) {
    res.redirect(req.get("referer"));
  }
  else {
    res.redirect("back");
  }
};

export let delComments = (req: Request, res: Response) => {
    const postId = req.body.postId;
    const currentuid = auth.currentUser.uid;
    const commentsId = req.body.commentsId;
    firebase_db.ref("/post/" + currentuid + "/" + postId).child("/comments/" + commentsId).once("value").then(function (data) {
        if (data != undefined) {
            firebase_db.ref("/post/" + currentuid + "/" + postId).child("/comments/" + commentsId).remove();
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
  res.redirect("back");
};

export let follow = (req: Request, res: Response) => {
    const uid = req.body.uid;
};

export let like = (req: Request, res: Response) => {
    const postId = req.body.postId;
    const uid = req.body.uid;
    const currentuid = auth.currentUser.uid;
    let tmp_likes = "";

    firebase_db.ref("/post/" + uid + "/" + postId).child("likes")
        .once("value").then(function (data) {
        const JsonData = data.val();
        if (JsonData.likes_list.length > 0) {
            tmp_likes = JsonData.likes_list + "," + uid;
        }
    }).catch(function (error) {
        console.log(error.code + " , " + error.message);
    });

    firebase_db.ref("/post/" + currentuid + "/" + postId).set({
        likes_list: tmp_likes
    }).catch(function (error) {
        console.log(error.code + " , " + error.message);
    });
    res.send(505);
};



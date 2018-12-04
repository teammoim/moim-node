import { Request, Response } from "express";
import * as firebase from "firebase";
import { Promise } from "bluebird";
import timeline, { comment } from "./timeline";

const dbconfig = require("../../fbconfig.js");
export default !firebase.apps.length ? firebase.initializeApp(dbconfig) : firebase.app();
const timelines = firebase.database();
const auth = firebase.auth();

import "firebase/storage";
const storageRef = firebase.storage().ref();

const isBase64 = require("is-base64");

function dataChecker(target: string) {
    const check = JSON.parse(target);

    Object.keys(check).forEach((k) => {
        if (check[k] === undefined) { return false; }
    });

    return true;
}

function detectCallback(target: object[], comparison: string[]) {
    return target.length >= comparison.length;
}
function sendDataFromUid(req: Request, res: Response, uid: String) {
  timelines.ref("/users/" + uid).once("value").then((snapshot) => {
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
      const subs = userData.subscribe;
      const currentuid = auth.currentUser.uid;
      let subsinfo: any = {};
      let postinfo: any;
      // Get subscribes data
      const subPromises: any[] = [];
      if (subs !== undefined) {
        Object.keys(subs).forEach((subid) => {
          subPromises.push(new Promise((resolve) => {
            timelines.ref("/users/" + subid).once("value").then((subshot) => {
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
      Promise.all(subPromises).then(() => {
      // Get post data
        timelines.ref("/post/" + uid).once("value").then((postshot) => {
          postinfo = postshot.val();
          if (postinfo === null) {
            throw ("there is no post on there");
          }
        }).catch((error) => {
          console.log(error);
          res.render("user/profile", {
            title: "Home",
            name: name,
            isfollow: "me", // "true","false","me"
            uid: "", // not need uid
            subscribes: subsinfo,
            you: userData,
            youpost: "",
          });
        }).then(() => {
          const promises: any[] = [];
          Object.keys(postinfo).forEach((k) => {
            const targetuid = postinfo[k].uid;
            promises.push(new Promise((resolve) => {
              timelines.ref("/users/" + targetuid).once("value").then((usershot) => {
                const userinfo = usershot.val();
                postinfo[k].name = userinfo["name"];
                postinfo[k].photourl = userinfo["url"];

              }).catch((err) => {
                console.log(err);
              }).then(() => {
                const commentsinfo = postinfo[k].comments;
                if (commentsinfo !== undefined) {
                  const comPromises: any[] = [];
                  Object.keys(commentsinfo).forEach((ckey) => {
                    const commentsuid = commentsinfo[ckey].uid;
                    comPromises.push(new Promise((resolve) => {
                      timelines.ref("/users/" + commentsuid).once("value").then((commentshot) => {
                        const comuserinfo = commentshot.val();
                        commentsinfo[ckey].name = comuserinfo["name"];
                        commentsinfo[ckey].photourl = comuserinfo["url"];
                        resolve(commentsinfo[ckey]);
                      }).catch((error) => {
                        console.log(error);
                      });
                    }));
                  });
                  Promise.all(comPromises).then(() => {
                    resolve(postinfo[k]);
                  });
                } else {
                  resolve(postinfo[k]);
                }
              });
            }));
          });
          Promise.all(promises).then(() => {
            console.log(postinfo);
            console.log(subsinfo);
            for (const key in postinfo) {
              console.log(postinfo[key].comments);
            }
            res.render("user/profile", {
              title: "Home",
              name: name,
              isfollow: "me", // "true","false","me"
              uid: currentuid, // not need uid
              subscribes: subsinfo,
              you: userData,
              youpost: postinfo,
            });
          });
        });
      });
      /* if (subs !== undefined) {
          Object.keys(subs).forEach((k) => {
              timelines.ref("/users/" + k).once("value", (snapinfo) => {
                  // console.log(snapinfo.val());
                  subsinfo.push(snapinfo.val());
                  console.log(subsinfo);
                  if (detectCallback(subsinfo, Object.keys(subs)) && detectCallback(postinfo, [])) {
                      // console.log(postinfo);
                      res.render("user/profile", {
                        title: "Home",
                        name: name,
                        isfollow: "me", // "true","false","me"
                        uid : "", // not need uid
                        subscribes: subsinfo,
                        you: userData,
                        youpost: postinfo
                      });
                  }
              });
          });
      } else {
          if (detectCallback(postinfo, [])) {
              // console.log(postinfo);
              res.render("user/profile", {
                title: "Home",
                name: name,
                isfollow: "me", // "true","false","me"
                uid : "", // not need uid
                subscribes: [],
                you: userData,
                youpost: postinfo
              });
          }
      }*/
    }

  }).catch((error) => {
    console.log(error);
  });
}

export let index = (req: Request, res: Response) => {
    const curruser = auth.currentUser;
    if (!curruser) {
        console.log("you have not logged");
        res.redirect("/login");
    } else {
      sendDataFromUid(req , res , curruser.uid);
    }
};

export let goProfile = (req: Request, res: Response) => {
  const uid = req.body.uid;
  sendDataFromUid(req, res, uid);
};

export let changeProfileImg = (req: Request, res: Response) => {
    // console.log(req.body);
    // console.log();
    // console.log(req.body.imgfile);
    const profimg = req.body.imgfile;
    // console.log(isBase64(profimg));
    console.log(profimg);
    storageRef.child("userProfile/" + auth.currentUser.uid + "/prof.png").putString(profimg, "base64").then((snapshot) => {
        console.log("Complete");
    })
    .catch((err) => {
        console.log(err);
        res.redirect("/profile");
    });
};

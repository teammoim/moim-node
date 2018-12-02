import { Request, Response } from "express";
import * as firebase from "firebase";
import { Promise } from "bluebird";

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

function detectCallback(target: object[], comparison: string[]) {
    return target.length >= comparison.length;
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
          const subs = userData.subscribe;
          const subsinfo: object[] = [];
          let postinfo: any;

          timelines.ref("/post/" + curruser.uid).once("value").then((postshot) => {
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
                  resolve(postinfo[k]);
                });
              }));
            });
            Promise.all(promises).then(() => {
              console.log(postinfo);
              res.render("user/profile", {
                title: "Home",
                name: name,
                isfollow: "me", // "true","false","me"
                uid: "", // not need uid
                subscribes: subsinfo,
                you: userData,
                youpost: postinfo,
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
          console.log("What is that!");
    console.log(error);
});
    }
};

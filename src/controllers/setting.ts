import { Request, Response } from "express";
import * as firebase from "firebase";
const dbconfig = require("../../fbconfig.js");
export default !firebase.apps.length ? firebase.initializeApp(dbconfig) : firebase.app();
const timelines = firebase.database();
const auth = firebase.auth();

export let index = (req: Request, res: Response) => {
  res.render("user/setting", {
    title: "Home"
  });
};

export let setting = (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  const phone = req.body.phonenumber;
  const realname = req.body.name;
  const nickname = req.body.nickname;
  const birth = req.body.birthdate;
  const gender = req.body.chk_info;
  const intro = req.body.intro;

  console.log("Update info" + email + " " + password + " " + phone + " " + realname + " " + nickname + " " + birth + " " + gender);

  timelines.ref("/users/" + auth.currentUser.uid).once("value", (snapshot) => {
      const x = snapshot.val();
      console.log(x);
  });
  // timelines.ref("/users/" + auth.currentUser.uid).set({
  //     birthday: (birth != "" && birth != undefined) ? birth : "????/??/??",
  //     email: (email != "" && email != undefined) ? email : auth.currentUser.email,
  //     name: (realname != "" && realname != undefined) ? realname : "Nonamed user",
  //     nickname: (nickname != "" && nickname != undefined) ? nickname : "Nonamed user",
  //     gender: (gender != "" && gender != undefined) ? gender : "Z",
  //     phonenumber: (phone != "" && phone != undefined) ? phone : "???????????",
  //     uid: auth.currentUser.uid
  // });

};

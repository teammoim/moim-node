import { Request, Response } from "express";
import * as firebase from "firebase";

const dbconfig = require("../../fbconfig.js");
export default !firebase.apps.length ? firebase.initializeApp(dbconfig) : firebase.app();
const markers = firebase.database();
const auth = firebase.auth();
export let index = (req: Request, res: Response) => {
  const curruser = auth.currentUser;
  let islogin: boolean = false;
  if (curruser) islogin = true;
    markers.ref("/events/").once("value").then((snapshot) => {
        console.log(snapshot.val());
        res.render("ar/2dmap", {
          title: "Home",
          islogin: islogin,
          marks: snapshot.val()
        });
    });

};

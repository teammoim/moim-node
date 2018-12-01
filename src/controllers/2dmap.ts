import { Request, Response } from "express";
import * as firebase from "firebase";

const dbconfig = require("../../fbconfig.js");
export default !firebase.apps.length ? firebase.initializeApp(dbconfig) : firebase.app();
const markers = firebase.database();

export let index = (req: Request, res: Response) => {
    markers.ref("/events/").once("value").then((snapshot) => {
        // const evx: object[] = [];
        // snapshot.forEach((child) => {
        //     evx.push(child.val());
        // });
        console.log(snapshot.val());
        res.render("ar/2dmap", {
          title: "Home",
          marks: snapshot.val()
        });
    });

};

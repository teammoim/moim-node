import { Request, Response } from "express";
import * as firebase from "firebase";
const dbconfig = require("../../fbconfig.js");
export default !firebase.apps.length ? firebase.initializeApp(dbconfig) : firebase.app();
const auth = firebase.auth();
const timelines = firebase.database();

export let index = (req: Request, res: Response) => {
    if (!auth.currentUser) {
        res.redirect("/login");
    }
    else {
        // contents have json object of timline
        const contents: object[] = [];
        timelines.ref("/timeline/").once("value", (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const child = childSnapshot.val();
                contents.push(child);
            });
            console.log(contents);
        });
    }

    res.render("timeline/timeline", {
       title: "Home"
       /* to-do
        * give client to DB JSON Data
        * hope variable name is contents
          contents : JSON */

          /*
          Example of contents =>
          [ { name: 't@t.com', text: 'hello, world!!' },
{ name: 'test@test.com', text: 'hi t@t.com!' },
{ name: 'smart8612@gmail.com', text: '74890378920' },
{ name: 'smart8612@gmail.com', text: '123456789' },
{ name: 'smart8612@gmail.com', text: '안녕하세요' },
{ name: 'smart8612@gmail.com', text: '최호경 ㅎㅇㅎㅇ' },
{ name: 'smart8612@gmail.com', text: 'ㅂㅈㄷㄱ' },
{ name: 'smart8612@gmail.com', text: '쇼ㅕㅑ' },
{ name: 'smart8612@gmail.com', text: 'ㅠ오어암' },
{ name: 'smart8612@gmail.com', text: 'ㅍ노어더ㅗㅓ' },
{ name: 'smart8612@gmail.com', text: '안녕하세요' },
{ name: 'smart8612@gmail.com', text: 'ifjiehisfh' },
{ name: 'smart8612@gmail.com', text: 'qwertyy' },
{ name: 'qwerty@qwerty.com', text: 'didjejjwj' },
{ name: 'qwertyu@qwertyu.com', text: 'bxcxhlcchkc' } ]
          */
     });

   };
   export let post = (req: Request, res: Response) => {
     const text = req.body.text;
     // const imageurls = req.body.images.split(","); // not made
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
     const uid = req.body.uid;
   };

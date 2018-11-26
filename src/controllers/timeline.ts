import { Request, Response } from "express";
import * as firebase from "firebase";
const dbconfig = require("../../fbconfig.js");
export default !firebase.apps.length ? firebase.initializeApp(dbconfig) : firebase.app();
const auth = firebase.auth();
const timelines = firebase.database();

export let index = (req: Request, res: Response) => {
    if (!auth.currentUser) {
        console.log("You have not logged");
        res.redirect("/login");
    } else {
        // contents have json object of timline
        const contents: object[] = [];
        timelines.ref("/posts/").once("value", (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const child = childSnapshot.val();
                contents.push(child);
            });
            // contents will have many data
            // console.log(contents);
        });
    }

    res.render("timeline/timeline", {
       title: "Home"
       /* to-do
        * give client to DB JSON Data
        /* client need...
           contents : {
             profile : [{name : "name", photourl : "" }]
             posts : [{ uid : "", postid : "", name: "kim", text : "my name is kim", imageurl : "firstsrc,secondsrc" ,
               comments : [{ uid : "", commentid : "" , photourl: "", name: "", text: "" },
                           { uid : "", commentid : "" , photourl: "", name: "", text: "" },
                           { uid : "", commentid : "" , photourl: "", name: "", text: "" }]},

                      { uid : "", postid : "", name : "Joh" text : "my name is joh", imageurl : "firstsrc,second" ,
               comments : [{ uid : "", commentid : "" , photourl: "", name: "", text: "" },
                           { uid : "", commentid : "" , photourl: "", name: "", text: "" },
                           { uid : "", commentid : "" , photourl: "", name: "", text: "" }]
             }]
             friends : [{uid : "", photourl="" , name : "zelda"},
                        {uid : "", photourl="" , name : "link"}]
           }

          client must need all of them

          photourl은 게시물 올린 사람의 프로필 이미지 - single
          imageurl은 게시물 내부의 이미지 - 여러개의 이미지 쉼표(,)로 구분

          timeline.ejs에서는 유저가 팔로우한 친구의 게시물들을 최신부터 표시
          profile.ejs에서는 유저가 쓴 게시물들을 최신부터 표시
     */
     });

};
   // writing post
   export let post = (req: Request, res: Response) => {
     const text = req.body.text;
     // const imageurls = req.body.images.split(","); // not made
   };
  // writing comment at post
   export let comment = (req: Request, res: Response) => {
     const text = req.body.text;
     const postid = req.body.postid;
   };
 // follow button click
   export let follow = (req: Request, res: Response) => {
     const uid = req.body.uid;
   };
 // like button click
   export let like = (req: Request, res: Response) => {
     const postid = req.body.postid;
   };
 // go profile page of clicked user
   export let goprofile = (req: Request, res: Response) => {
     const uid = req.body.uid;
   };

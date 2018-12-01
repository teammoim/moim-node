import { Request, Response } from "express";
import bodyParser from "body-parser";

/* Initialize firebase */
import * as firebase from "firebase";
const firebase_config = require("../../fbconfig.js");
export default !firebase.apps.length ? firebase.initializeApp(firebase_config) : firebase.app();
const firebase_db = firebase.database();
const auth = firebase.auth();

const DEBUG_FLAG = false;

export let index = (req: Request, res: Response) => {
    res.render("user/signUp", {title: "Home"});
};

export let signUp = (req: Request, res: Response) => {
    const signUp_Info: string[] = [
        req.body.email,
        req.body.password,
        req.body.realname
    ];

    for (let i = 0; i < signUp_Info.length; i++) {
        /* 빈 칸이 존재하는 채로 데이터가 서버로 들어옴 */
        if (signUp_Info[i] === "" || signUp_Info[i] === undefined || signUp_Info[i] === " ") {
            res.send({status: 1, index: i});
            return;
        }

        /* 패스워드는 최소 8자리 이상 */
        if (signUp_Info[1].length < 8) {
            res.send({status: 2, index: i});
            return;
        }
    }

    auth.createUserWithEmailAndPassword(signUp_Info[0], signUp_Info[1])
        .then((userData) => {
            userData.additionalUserInfo.username = signUp_Info[2];

            if (!userData) {
                return;
            }

            firebase_db.ref("/users/" + userData.user.uid).set({
                email: userData.user.email,
                name: signUp_Info[2],
                uid: userData.user.uid,
                intro: "",
                birthday: "",
                gender: "",
                nickname: "",
                phone: "",
                follow: {}
            }).catch(function (error) {
                if (error.code == "auth/email-already-in-use") {
                    res.send(3);
                }
                res.send(-99);
            });

            auth.signInWithEmailAndPassword(signUp_Info[0], signUp_Info[1]).then((user) => {
                res.redirect("/profile");
            }).catch(function (error) {
                if (DEBUG_FLAG) {
                    console.log(error.code + " " + error.message);
                }
                res.send(-99);
            });
        });
};

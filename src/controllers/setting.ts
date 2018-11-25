import { Request, Response } from "express";
import * as firebase from "firebase";
const dbconfig = require("../../fbconfig.js");
export default !firebase.apps.length ? firebase.initializeApp(dbconfig) : firebase.app();
const timelines = firebase.database();
const auth = firebase.auth();

function notNull(target: string) {
    return (target != undefined && target != "");
}

export let index = (req: Request, res: Response) => {
  res.render("user/setting", {
    title: "Home"
  });
};

export let changesetting = (req: Request, res: Response) => {
    const user = auth.currentUser;
    const dbaccess = timelines.ref("/users/" + user.uid);

    if (!user) {
        console.log("you have not logged");
        res.redirect("/login");
    }

    // Umm.... ok, I think I can refactor this codes...
    const email = req.body.email;
    if (notNull(email) && (email.indexOf("@") > 0)) {
        user.updateEmail(email).then(() => {
            dbaccess.update({email : email});
        })
        .catch(() => {
            console.log("Error detected : EMAIL");
        });
    }
    const password = req.body.password;
    if (notNull(password) && (7 < password.length)) {
        user.updatePassword(password).then(() => {
        }).catch(() => {
            console.log("Error detected : PASSWORD");
        });
    }
    const phone = req.body.phonenumber;
    if (notNull(phone) && (10 < phone.length)) {
        dbaccess.update({phonenumber: phone});
    }
    const realname = req.body.name;
    if (notNull(realname)) {
        dbaccess.update({name: realname});
    }
    const nick = req.body.nickname;
    if (notNull(nick)) {
        dbaccess.update({nickname: nick});
    }
    const birth = req.body.birthdate;
    if (notNull(birth)) {
        dbaccess.update({birthday: birth});
    }
    const sex = req.body.chk_info;
    if (notNull(sex)) {
        dbaccess.update({gender: sex});
    }
    const userintro = req.body.intro;
    dbaccess.update({intro: userintro});

    dbaccess.once("value", (snapshot) => {
        const x = snapshot.val();
        console.log(x);
    });
};

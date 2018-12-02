function Post(writer = "unknown", text = "", images = []) {
    this.writer = writer;
    this.writerImage;
    this.time = new Date();
    this.text = text;
    this.images = [];
    this.likes = 0;
    this.postid = "";
    this.userid = "";
    this.presslike = false;
    this.comments = []; //  argument : Comment
    for (i = 0; i < images.length; i++) {
        let image = new Image();
        image.src = images[i];
        this.images.push(image);
    }
}

Post.prototype.setWriter = function (writer) {
    this.writer = writer;
};
Post.prototype.setTime = function () {
    this.time = new Date();
};
Post.prototype.setTime = function (y, m, d, hour, min, sec) {
    this.time = new Date(y, m, d, hour, min, sec);
};
Post.prototype.setText = function (text) {
    this.text = text;
};
Post.prototype.setWriterImage = function (Image) {
    this.writerImage = Image;
};
Post.prototype.setImage = function (Image) {
    while (this.images.length !== 0) this.images.pop();
    this.images.push(Image);
};
Post.prototype.addImage = function (Image) {
    this.images.push(Image);
};
Post.prototype.addComment = function (Comment) {
    this.comments.push(Comment);
}

function Comment() {
    this.writer = "";
    this.writerImage = "";
    this.time = new Date();
    this.text = "";
    this.likes = 0;
    this.postid = "";
    this.commentid = "";
};
Comment.prototype.setText = function (text) {
    this.text = text;
};
Comment.prototype.setWriter = function (name) {
    this.name = name;
};
Comment.prototype.setWriterImage = function (src) {
    this.writerImage = new Image();
    writerImage.src = src;
};
Comment.prototype.setTime = function () {
    this.time = new Date();
};
Comment.prototype.setTime = function (y, m, d, hour, min, sec) {
    this.time = new Date(y, m, d, hour, min, sec);
};

Post.prototype.Calc_timestamp = function () {//compare now time with post time to make timestamp
    let date = new Date();
    let Minute = 1000 * 60;//millisecond
    let Hour = Minute * 60;
    let Day = Hour * 24;
    let Millisecond = date.getTime() - this.time.getTime();
    let timestamp;
    if (Millisecond < Minute) {
        timestamp = "방금"
    } else if (Millisecond < Hour) {
        timestamp = parseInt(Millisecond / Minute) + "분 전"
    } else if (Millisecond < Day) {
        timestamp = parseInt(Millisecond / Hour) + "시간 전"
    } else {
        let hourmin = (this.time.getHours() < 12 ? "오전 " : "오후 ") + this.time.getHours() + ":" + this.time.getMinutes();
        let monthday = (this.time.getMonth() + 1) + "월 " + this.time.getDate() + "일 ";
        if (Millisecond < Day * 2) {
            timestamp = "어제 " + hourmin
        } else if (this.time.getTime() >= 1514732400000) {
            timestamp = monthday + hourmin
        } // before 2018
        else {
            timestamp = this.time.getFullYear() + "년 " + monthday
        }// after 2018
    }
    return timestamp;
}

let sendform = document.createElement("form");
sendform.method = "post";
document.body.appendChild(sendform);

let sendElement = document.createElement("input");
sendElement.type = "hidden";
sendform.appendChild(sendElement);

let sendElement1 = document.createElement("input");
sendElement1.type = "hidden";
sendform.appendChild(sendElement1);


function goProfile(uidvalue) {
    sendform.action = "/goprofile";

    sendElement.name = "uid";
    sendElement.value = uidvalue;
    sendform.submit();
}

function editPost(postidvalue, textareavalue) {
    sendform.action = "/editpost";

    sendElement.name = "postid";
    sendElement.value = postidvalue;

    sendElement1.name = "text";
    sendElement1.value = textareavalue;
    sendform.submit();
}

function deletePost(postidvalue) {
    let r = confirm("Are you sure you want to delete");
    if (r === true) {
        sendform.action = "/delPost";
        sendElement.name = "postid";
        sendElement.value = postidvalue;
        sendform.submit();
    }
}

function deleteComment(postidvalue, commentidvalue) {
    let r = confirm("Are you sure you want to delete");
    if (r === true) {
        sendform.action = "/delComments";

        sendElement.name = "postid";
        sendElement.value = postidvalue;

        sendElement1.name = "commentid";
        sendElement1.value = commentidvalue;
        sendform.submit();
    }
}

let posts = [];

function createPost(Post) {
    posts.push(Post);
}

function commentClick(Comments_array, where) {
    let comment_box = where.getElementsByClassName("comments-box");
    if (comment_box.length !== 0) {

        where.removeChild(comment_box[0]);
    } else {
        implementComment(Comments_array, where);
    }
}

function implementPost(Post) {
    /*   connect all box and inline tags  */
    let timeline_posts = document.getElementsByClassName("timeline-posts")[0];
    let post = document.createElement("article");
    post.className = "post";
    timeline_posts.appendChild(post);

    let form = document.createElement("form");
    form.action = "/tryfollow";
    form.method = "post";
    post.appendChild(form);

    let uid = document.createElement("input");
    uid.type = "hidden";
    uid.name = "uid";
    uid.value = "uid sample"; // need uid from server
    form.appendChild(uid);

    let postid = document.createElement("input");
    form.appendChild(postid);
    postid.type = "hidden";
    postid.name = "postid";
    postid.value = "postid sample"; // need postid from server

    let islike = document.createElement("input");
    form.appendChild(islike);
    islike.type = "hidden";
    islike.name = "islike";
    islike.value = "true";

    let isfollow = document.createElement("input");
    form.appendChild(isfollow);
    isfollow.type = "hidden";
    isfollow.name = "isfollow";
    isfollow.value = "true";

    let media_content = document.createElement("div");
    post.appendChild(media_content);

    let post_writer = document.createElement("div");
    post_writer.className = "post-writer";
    media_content.appendChild(post_writer);

    let writer_left = document.createElement("div");
    writer_left.className = "writer-left";
    post_writer.appendChild(writer_left);

    //in writer-left tag
    let writerImage = document.createElement("img");
    writerImage.className = "writer-image";
    writerImage.onclick = function () {
        goProfile(uid.value);
    }
    writer_left.appendChild(writerImage);

    let writer_right = document.createElement("div");
    writer_right.className = "writer-right";
    post_writer.appendChild(writer_right);

    //in writer-right tag
    let writer = document.createElement("span");
    writer.className = "writer";
    writer.onclick = function () {
        goProfile(uid.value);
    };
    writer_right.appendChild(writer);
    let br = document.createElement("br");
    writer_right.appendChild(br);


    let writer_follow = document.createElement("div");
    writer_follow.className = "writer-follow";
    post_writer.appendChild(writer_follow);

    //in writer-right tag
    let timestamp_time = document.createElement("span");
    timestamp_time.className = "timestamp";
    writer_right.appendChild(timestamp_time);

    let content = document.createElement("div");
    media_content.appendChild(content);

    //in content tag
    let content_text = document.createElement("div");
    content_text.className = "content-text";
    content.appendChild(content_text);

    let text = document.createElement("p");
    content_text.appendChild(text);

    //in content tag
    let image_box = document.createElement("div");
    image_box.className = "content-image";
    content.appendChild(image_box);

    let hr_half = document.createElement("hr");
    hr_half.id = "hr-half";
    media_content.appendChild(hr_half);

    let level = document.createElement("nav");
    level.className = "level is-mobile";
    level.innerHTML = '' +
        '<a class="level-item" style="margin-bottom:5px;" >' +
        '  <span class="icon is-small"><i class="level material-icons">favorite</i></span>' +
        '   Like' +
        '          </a >' +
        '<a class="level-item" style="margin-bottom:5px;">' +
        '  <span class="icon is-small"><i class="level material-icons">mode_comment</i></span>' +
        '    Comment' +
        '          </a>';
    let likeButton = level.getElementsByClassName("level-item")[0];
    let commentButton = level.getElementsByClassName("level-item")[1];
    media_content.appendChild(level);

    /* add event listeners to button */
    presslike = false;
    likeButton.onclick = function () {
        if (presslike) {
            likeButton.style.color = "grey";
            presslike = true;
        } else {
            likeButton.style.color = "red";
            presslike = false;
        }
        form.action = "/submitLike";
        form.submit();
    }

    commentButton.onclick = function () {
        commentClick(Post.comments, post);
    };
    /* if(uid.value == useruid){ */
    if (Post.writer === "james") { // james is first object of sample timeline
        let edit_button = document.createElement("a");
        edit_button.className = "icon-button";
        edit_button.innerHTML = '<i class="material-icons">mode_edit</i> ';
        writer_follow.appendChild(edit_button);

        let isEditClick = false;
        let temptext;
        edit_button.onclick = function () {
            if (isEditClick === false) {
                temptext = content_text.innerText;
                content_text.innerHTML = "";
                let edit_textarea = document.createElement("textarea");
                edit_textarea.className = "write-post-textarea";
                edit_textarea.name = "text";
                edit_textarea.placeholder = "write you want";
                edit_textarea.style.fontSize = "130%";
                edit_textarea.value = temptext;
                content_text.appendChild(edit_textarea);

                let edit_footer = document.createElement("div");
                edit_footer.style.height = "30px";
                edit_footer.style.marginTop = "5px";
                content_text.appendChild(edit_footer);

                let edit_accept = document.createElement("button");
                edit_accept.className = "button is-info";
                edit_accept.innerText = "Save";
                edit_accept.style.cssFloat = "right";
                edit_accept.onclick = function () {
                    editPost(postid.value, edit_textarea.value);
                };
                edit_footer.appendChild(edit_accept);
                isEditClick = true;
            } else {
                while (content_text.firstElementChild) {
                    content_text.removeChild(content_text.firstElementChild);
                }
                let paragraph = document.createElement("p");
                paragraph.innerText = temptext;
                content_text.appendChild(paragraph);
                isEditClick = false;
            }
        }
        let delete_button = document.createElement("a");
        delete_button.className = "icon-button";
        delete_button.innerHTML = '<i class="material-icons">clear</i> ';
        writer_follow.appendChild(delete_button);
        writer_follow.style.marginRight = "5px";
        delete_button.onclick = function () {
            deletePost(postid.value);
        }
    } else {
        //add follow_button
        let follow_button = document.createElement("button");
        writer_follow.appendChild(follow_button);
        //if(is followed) button.innerText = "followed"
        follow_button.innerText = "Follow";
        follow_button.className = "button is-rounded is-info";
        follow_button.parentElement = post_writer;
        let isfollowed = true;
        follow_button.onclick = function () {
            if (isfollowed) {
                this.innerText = "Follow";
                isfollowed = false;
            } else {
                this.innerText = "Followed";
                isfollowed = true;
            }
            form.action = "/tryfollow";
            form.submit();
        }
    }

    /*  Input all the information of post  */
    writer.innerText = Post.writer;//set writer's name
    text.innerText = Post.text; //set content text
    timestamp_time.innerText = Post.Calc_timestamp();

    //if writer image is not ready, set writer image default
    if (typeof Post.writerImage !== 'object') {
        writerImage.src = "images/default-writerImage.png";
    } else writerImage = Post.writerImage;
    if (Post.images.length !== 0) {
        for (i = 0; i < Post.images.length; i++) {
            image_box.appendChild(Post.images[i]);
        }
        image_box.style.paddingBottom = "15px";
    }

}

function implementComment(Comments, where) {
    let comments_box = document.createElement("div");
    comments_box.className = "comments-box";
    where.appendChild(comments_box);
    hr_comment = document.createElement("hr");
    hr_comment.style.marginTop = "0px";
    hr_comment.style.marginBottom = "10px";
    comments_box.appendChild(hr_comment);
    //at first add posting comment

    implementWriteComment(comments_box);

    for (i = 0; i < Comments.length; i++) {
        let comment = document.createElement("article");
        comment.className = "media comment";
        comments_box.appendChild(comment);

        let commentid = document.createElement("input");
        commentid.type = "hidden";
        commentid.name = "commentid";
        commentid.value = "comment id sample";
        comment.appendChild(commentid);

        let uid = document.createElement("input");
        uid.type = "hidden";
        uid.name = "uid";
        uid.value = "uid sample"; // need uid from server
        comment.appendChild(uid);

        let postid = document.createElement("input");
        postid.type = "hidden";
        postid.name = "postid";
        postid.value = "postid sample";
        comment.appendChild(postid);

        let comment_writer = document.createElement("div");
        comment_writer.className = "comment-writer";
        comment.appendChild(comment_writer);

        let comment_writer_left = document.createElement("div");
        comment_writer_left.className = "comment-writer-left";
        comment_writer.appendChild(comment_writer_left);

        let commentWriterImage = document.createElement("img");
        commentWriterImage.className = "comment-writer-image";
        commentWriterImage.onclick = function () {
            goProfile(uid.value);
        }
        comment_writer_left.appendChild(commentWriterImage);

        let comment_writer_right = document.createElement("div");
        comment_writer_right.className = "comment-writer-right";
        comment_writer.appendChild(comment_writer_right);

        let commentWriter = document.createElement("span");
        commentWriter.className = "commentWriter";
        commentWriter.onclick = function () {
            goProfile(uid.value);
        }
        comment_writer_right.appendChild(commentWriter);

        if (uid.value === "give me timeline json") {
            let commentdel = document.createElement("a");
            commentdel.style = "float:right;margin-right:5px";
            commentdel.innerHTML = '<i class="material - icons">highlight_off</i>';
            commentdel.onclick = function () {
                deleteComment(postid.value, commentid.value);
            };
            comment_writer_right.appendChild(commentdel);
        }

        let comment_content = document.createElement("div");
        comment_content.className = "content";
        comment.appendChild(comment_content);

        let comment_textbox = document.createElement("p");
        comment_content.appendChild(comment_textbox);
        comment_textbox.className = "comment-textbox";

        let commentText = document.createElement("span");
        commentText.className = "comment-text";
        comment_textbox.appendChild(commentText);

        let currentComment = Comments[i];
        commentText.innerText = currentComment.text;
        commentWriter.innerText = currentComment.writer;
        if (typeof currentComment.writerImage !== 'object') {
            commentWriterImage.src = "images/default-writerImage.png";
        } else commentWriterImage.src = currentComment.writerImage.src;
    }
}

function implementWritePost() {
    let timeline_posts = document.getElementsByClassName("timeline-posts")[0];
    let post = document.createElement("article");
    post.className = "post";
    timeline_posts.appendChild(post);

    let box = document.createElement("div");
    box.className = "post-writer";
    post.appendChild(box);

    let box_left = document.createElement("div");
    box_left.className = "write-post-left";
    box.appendChild(box_left);

    let writerImage = document.createElement("img");
    writerImage.className = "write-writer-image";
    writerImage.src = "images/default-writerImage.png";
    writerImage.style.cursor = "defalut";
    box_left.appendChild(writerImage);

    let box_right = document.createElement("div");
    box_right.className = "write-post-right";
    box.appendChild(box_right);

    let form = document.createElement("form");
    form.action = "/createPost";
    form.method = "post";
    box_right.appendChild(form);

    let textarea = document.createElement("textarea");
    textarea.className = "write-post-textarea";
    textarea.placeholder = "Write here";
    textarea.name = "text";
    form.appendChild(textarea);
    let isclick = false;
    textarea.onclick = function () {
        if (isclick === true) return;
        textarea.style.height = "130px";
        isclick = true;
    };

    let preview = document.createElement("div");
    post.appendChild(preview);

    let imgInput = document.createElement("input");
    imgInput.type = "hidden";
    imgInput.name = "img_url";
    form.appendChild(imgInput);

    let box_under = document.createElement("div");
    box_under.style.width = "100%";
    box_under.style.paddingBottom = "3px";
    box_under.style.display = "inline-block";
    post.appendChild(box_under);

    let postButton = document.createElement("button");
    postButton.className = "button is-info write-post-button";
    postButton.innerText = "Post";
    postButton.onclick = function () {
        let resultarray = [];
        let temparray = imgfiles.toString().split(",");
        for (let i = 0; i < temparray.length; i++) {
            if (i % 2 === 1) {
                resultarray.push(temparray[i]);
            }
        }
        imgInput.value = resultarray;
        form.submit();
    };
    box_under.appendChild(postButton);

    let writeButtonBox = document.createElement("div");
    writeButtonBox.className = "write-button-box";
    box_under.appendChild(writeButtonBox);

    let buttonsform = document.createElement("form");
    writeButtonBox.appendChild(buttonsform);
    buttonsform.method = "post";

    let imagePostbutton = document.createElement("div");
    imagePostbutton.className = "img-button";
    buttonsform.appendChild(imagePostbutton);

    let label = document.createElement("label");
    label.htmlFor = "img_file";

    label.name = "images";
    label.innerHTML = "<i class='material-icons' style='font-size:30px'>add_a_photo</i>";
    imagePostbutton.appendChild(label);

    let imgfiles = [];
    let imgUpload = document.createElement("input");
    imgUpload.type = "file";
    imgUpload.id = "img_file";
    imgUpload.multiple = true;
    imagePostbutton.appendChild(imgUpload);
    imgUpload.onchange = function () {
        if (imgUpload.files[0].type.match(/image.*/)) {
            let reader = new FileReader();
            let img = document.createElement("img");
            img.className = "preview-image";
            preview.appendChild(img);
            preview.className = "post-preview";
            reader.onload = function (e) {
                img.src = e.target.result;
                imgfiles.push(img.src);
            };
            reader.readAsDataURL(imgUpload.files[0]);
        } else {
            alert("Wrong file selected\n Please upload image file");
        }
    };

}

function implementWriteComment(comments_box) {
    let form = document.createElement("form");
    form.action = "/submitComments";
    form.method = "post";
    comments_box.appendChild(form);

    let comment = document.createElement("article");
    comment.className = "media comment";
    form.appendChild(comment);

    let write_comment = document.createElement("div");
    write_comment.className = "write-comment";
    comment.appendChild(write_comment);

    let write_comment_left = document.createElement("div");
    write_comment_left.className = "write-comment-left";
    write_comment.appendChild(write_comment_left);

    let write_comment_image = new Image();
    write_comment_image.src = "images/default-writerImage.png";
    write_comment_image.className = "comment-write-writer-image";
    write_comment_left.appendChild(write_comment_image);

    let write_comment_right = document.createElement("div");
    write_comment_right.className = "write-comment-right";
    write_comment.appendChild(write_comment_right);

    let textarea = document.createElement("textarea");
    textarea.className = "write-post-textarea";
    textarea.placeholder = "Write here";
    textarea.name = "text";
    write_comment_right.appendChild(textarea);
    textarea.onclick = function () {
        textarea.style.height = "80px";
        comment.style.height = "130px";
    };

    let postid = document.createElement("input");
    postid.type = "hidden";
    postid.name = "postid";
    postid.value = "post id sample"; // need postid from server
    form.appendChild(postid);

    let box_under = document.createElement("div");
    box_under.style.width = "100%";
    box_under.style.paddingBottom = "3px";
    box_under.style.height = "60px";
    comment.appendChild(box_under);

    let write_comment_button = document.createElement("button");
    write_comment_button.className = "button is-info write-post-button";
    write_comment_button.innerText = "Post";
    write_comment_button.style = "margin-right:10px";
    write_comment_button.onclick = function () {
        form.submit();
    }
    box_under.appendChild(write_comment_button);


}

function JSONtoPost(JSONstring) {
    let JSONobj = JSON.parse(JSONstring);
    Object.keys(JSONobj).forEach(function (k) {
        let post = JSONobj[k];
        let pid = post['postId'];
        let uid = post['uid'];
        let text = post['text'];
        let image = post['url'];
        let name = post['name'];
        let userimage = post['photourl'];
        let mpost = new Post(name, text);
        mpost.postid = pid;
        mpost.userid = uid;
        /*if (image) {
          mpost.images = image.split(",");
        }
        if (userimage) {
          mpost.writerImage = userimage;
        }*/
        createPost(mpost);
    });
};

window.onload = function () {
    let youpost = document.getElementById("jsonpost").value;
    JSONtoPost(youpost);
    implementWritePost();
    if (window.innerWidth > 950) {
        implementProfile();
    }
    if (window.innerWidth > 1250 || document.getElementsByClassName("timeline-profile").length === 0) {
        implementFriends();
    }
    for (let i = 0; i < posts.length; i++) {
        implementPost(posts[i]);
    }

    let JSONobj = JSON.parse(JSONstring);
    for (let i = 0; i < JSONobj.length; i++) {
        let post = JSONobj[i];
        let pid = post.postid;
        let uid = post.uid;
        let text = post.text;
        let image = post.url;
        let name = uid.name;
        let userimage = uid.image;
        let mpost = new Post(name, text);
        mpost.postid = pid;
        mpost.userid = uid;
        if (image) {
            mpost.images = image.split(",");
        }
        if (userimage) {
            mpost.writerImage = userimage;
        }
        createPost(mpost);
    }
};

window.onload = function () {
    implementWritePost();
    if (window.innerWidth > 950) {
        implementProfile();
    }
    if (window.innerWidth > 1250 || document.getElementsByClassName("timeline-profile").length === 0) {
        implementFriends();
    }
    for (let i = 0; i < posts.length; i++) {
        implementPost(posts[i]);
    }
};


$(window).resize(function () {
    let profileBox = document.getElementsByClassName("timeline-profile")[0];
    if (window.innerWidth > 950) {
        if (profileBox.childElementCount === 0) {
            implementProfile();
        }
    } else {
        profileBox.removeChild(profileBox.firstElementChild);
    }
});

$(window).resize(function () {
    let friendsBox = document.getElementsByClassName("timeline-friends")[0];
    if (window.innerWidth > 1250) {
        if (friendsBox.childElementCount === 0) {
            implementFriends();
        }
    } else {
        friendsBox.removeChild(friendsBox.firstElementChild);
    }
});

function implementProfile() {
    if (document.getElementsByClassName("timeline-profile").length === 0) {
        return;
    }

    let profileBox = document.getElementsByClassName("timeline-profile")[0];
    let profile = document.createElement("div");
    profile.className = "profile-box";
    profileBox.appendChild(profile);

    let uid = document.createElement("input");
    uid.type = "hidden";
    uid.value = "uid sample";
    profile.appendChild(uid);

    let profile_first = document.createElement("div");
    profile_first.className = "profile-first";
    profile.appendChild(profile_first);

    let profile_image = new Image();
    profile_image.className = "profile-image";
    profile_image.src = "/images/default-writerImage.png";
    profile_image.onclick = function () {
        location.href = '/profile';
    };
    profile_first.appendChild(profile_image);

    //contains profile name
    let profile_second = document.createElement("div");
    profile_second.className = "profile-second";
    profile_second.innerText = "name";
    profile.appendChild(profile_second);

    //contains followers and friends number
    let profile_third = document.createElement("div");
    profile_third.className = "profile-third";
    profile_third.innerText = " friends : ";
    profile.appendChild(profile_third);
}

function implementFriends() {
    if (document.getElementsByClassName("timeline-friends").length === 0) {
        return;
    }

    let friendsBox = document.getElementsByClassName("timeline-friends")[0];
    let friends = document.createElement("div");
    friends.className = "friends";
    friendsBox.appendChild(friends);

    for (let i = 0; i < friend_list.length; i++) {
        let friend = document.createElement("div");
        friend.className = "friend";
        friends.appendChild(friend);

        let uid = document.createElement("input");
        uid.type = "hidden";
        uid.value = "uid sample"; // need uid from server
        friend.appendChild(uid);

        friend.onclick = function () {
            goProfile(uid.value);
        };

        let friend_left = document.createElement("div");
        friend_left.className = "friend-left";
        friend.appendChild(friend_left);

        let friend_image = new Image();
        friend_image.className = "friend-image";
        friend_image.src = friend_list[i].image;
        friend_left.appendChild(friend_image);

        let friend_right = document.createElement("div");
        friend_right.className = "friend-right";
        friend_right.innerText = friend_list[i].name;
        friend.appendChild(friend_right);
    }
}


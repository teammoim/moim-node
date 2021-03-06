
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
  for (i = 0; i<images.length;i++){
    var image = new Image();
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
Post.prototype.setTime = function (milliseconds) {
  this.time = new Date(milliseconds);
}
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
var Friend = function (name = "", image = "/images/default-writerImage.png") {
  this.name = name;
  this.image = image;
  this.uid = uid;
}

function Comment() {
  this.writer = "";
  this.writerImage;
  this.time = new Date();
  this.text = "";
  this.likes = 0; 
  this.postid = "";
  this.uid = "";
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

Post.prototype.Calc_timestamp = function(){//compare now time with post time to make timestamp
  var date = new Date();
  var Minute = 1000*60;//millisecond
  var Hour = Minute*60;
  var Day = Hour*24;
  var Millisecond = date.getTime() - this.time.getTime();
  var timestamp;
  if (Millisecond<Minute){timestamp = "방금"}
  else if (Millisecond<Hour){timestamp = parseInt(Millisecond/Minute) + "분 전"}
  else if (Millisecond<Day){timestamp = parseInt(Millisecond/Hour) + "시간 전"}
  else{
    var hourmin = (this.time.getHours()<12 ? "오전 " : "오후 ") + this.time.getHours() + ":" + this.time.getMinutes();
    var monthday = (this.time.getMonth()+1) + "월 " + this.time.getDate() + "일 ";
    if (Millisecond<Day*2){timestamp = "어제 " + hourmin}
    else if (this.time.getTime()>=1514732400000){timestamp = monthday + hourmin} // before 2018
    else {timestamp = this.time.getFullYear() + "년 " + monthday}// after 2018
  }
  return timestamp;
}

var sendform = document.createElement("form");
sendform.method = "post";
document.body.appendChild(sendform);

var sendElement = document.createElement("input");
sendElement.type = "hidden";
sendform.appendChild(sendElement);

var sendElement1 = document.createElement("input");
sendElement1.type = "hidden";
sendform.appendChild(sendElement1);



function goProfile(uidvalue) {
  sendform.action = "/profile/" + "view";
  sendform.method = "get";

  sendElement.name = "uid";
  sendElement.value = uidvalue;
  sendform.submit();
}
function editPost(postidvalue , textareavalue) {
  sendform.action = "/editpost";

  sendElement.name = "postId";
  sendElement.value = postidvalue;

  sendElement1.name = "text";
  sendElement1.value= textareavalue;
  sendform.submit();
}
function deletePost(postidvalue) {
  var r = confirm("Are you sure you want to delete?");
  if (r === true) {
    sendform.action = "/delPost";

    sendElement.name = "postId";
    sendElement.value = postidvalue;
    sendform.submit();
  }
}
function deleteComment(postidvalue, commentidvalue) {
  var r = confirm("Are you sure you want to delete?");
  if (r === true) {
    sendform.action = "/delComments";

    sendElement.name = "postId";
    sendElement.value = postidvalue;

    sendElement1.name = "commentsId";
    sendElement1.value = commentidvalue;
    sendform.submit();
  }
}

var posts = [];
var friend_list = []; // argument : friend


function createPost(Post) {
  posts.push(Post);
}




function commentClick(Comments_array, where , Post) {
  var comment_box = where.getElementsByClassName("comments-box");
  if (comment_box.length !== 0) {
    where.removeChild(comment_box[0]);
  }
  else {
    implementComment(Comments_array, where , Post);
  }
}

function implementPost(Post) {
    /*   connect all box and inline tags  */
    var timeline_posts = document.getElementsByClassName("timeline-posts")[0];
    var post = document.createElement("article");
    post.className = "post";
    timeline_posts.appendChild(post);

    var form = document.createElement("form");
    form.action = "/tryfollow";
    form.method = "post";
    post.appendChild(form);

    var uid = document.createElement("input");
    uid.type = "hidden";
    uid.name = "uid";
    uid.value = Post.userid; // need uid from server
  form.appendChild(uid);

  var targetuid = document.createElement("input");
  targetuid.type = "hidden";
  targetuid.name = "targetuid";
  targetuid.value = Post.userid;
  form.appendChild(targetuid);

    var postid = document.createElement("input");
    form.appendChild(postid);
    postid.type = "hidden";
    postid.name = "postId";
    postid.value = Post.postid; // need postid from server

  var islike = document.createElement("input");
  form.appendChild(islike);
  islike.type = "hidden";
  islike.name = "islike";
  islike.value = "true";

  var isfollow = document.createElement("input");
  form.appendChild(isfollow);
  isfollow.type = "hidden";
  isfollow.name = "isfollow";
  isfollow.value = "true";

  

    var media_content = document.createElement("div");
    post.appendChild(media_content);

    var post_writer = document.createElement("div");
    post_writer.className = "post-writer";
    media_content.appendChild(post_writer);

    var writer_left = document.createElement("div");
    writer_left.className = "writer-left";
    post_writer.appendChild(writer_left);

    //in writer-left tag
    var writerImage = document.createElement("img");
  writerImage.className = "writer-image";
  writerImage.onclick = function () {
    goProfile(uid.value);
  }
    writer_left.appendChild(writerImage);

    var writer_right = document.createElement("div");
    writer_right.className = "writer-right";
    post_writer.appendChild(writer_right);

    //in writer-right tag
    var writer = document.createElement("span");
  writer.className = "writer";
  writer.onclick = function () {
    goProfile(uid.value);
  }
    writer_right.appendChild(writer);
    var br = document.createElement("br");
    writer_right.appendChild(br);
  

  var writer_follow = document.createElement("div");
  writer_follow.className = "writer-follow";
  post_writer.appendChild(writer_follow);

    //in writer-right tag
    var timestamp_time = document.createElement("span");
    timestamp_time.className = "timestamp";
    writer_right.appendChild(timestamp_time);

    var content = document.createElement("div");
    media_content.appendChild(content);

    //in content tag
    var content_text = document.createElement("div");
    content_text.className = "content-text";
    content.appendChild(content_text);

    var text = document.createElement("p");
    content_text.appendChild(text);


    //in content tag
    var image_box = document.createElement("div");
    image_box.className = "content-image";
    content.appendChild(image_box);

    var hr_half = document.createElement("hr");
    hr_half.id = "hr-half";
    media_content.appendChild(hr_half);

    var level = document.createElement("nav");
  level.className = "level is-mobile";
  level.innerHTML = '' +
    '<a class="level-item" style="margin-bottom:5px;">' +
    '  <span class="icon is-small"><i class="level material-icons">mode_comment</i></span>' +
    '    Comment' +
    '          </a>';
    //var likeButton = level.getElementsByClassName("level-item")[0];
    var commentButton = level.getElementsByClassName("level-item")[0];
    media_content.appendChild(level);
  /* add event listeners to button */
  /* presslike = false;
  likeButton.onclick = function () {
    if (presslike) {
      likeButton.style.color = "grey";
      presslike = true;
    }
    else {
      likeButton.style.color = "red";
      presslike = false;
    }
    form.action = "/submitLike";
    form.submit();
  }*/

  commentButton.onclick = function () {
    commentClick(Post.comments, post, Post);
  };
  var currid = document.getElementById("uid");
  if (Post.userid === currid.value) { 
    var edit_button = document.createElement("a");
    edit_button.className = "icon-button";
    edit_button.innerHTML = '<i class="material-icons">mode_edit</i> ';
    writer_follow.appendChild(edit_button);

    var isEditClick = false;
    var temptext;
    edit_button.onclick = function () {
      if (isEditClick === false) {
        temptext = content_text.innerText;
        content_text.innerHTML = "";
        var edit_textarea = document.createElement("textarea");
        edit_textarea.className = "write-post-textarea";
        edit_textarea.name = "text";
        edit_textarea.placeholder = "write you want";
        edit_textarea.style.fontSize = "130%";
        edit_textarea.value = temptext;
        content_text.appendChild(edit_textarea);

        var edit_footer = document.createElement("div");
        edit_footer.style.height = "30px";
        edit_footer.style.marginTop = "5px";
        content_text.appendChild(edit_footer);

        var edit_accept = document.createElement("button");
        edit_accept.className = "button is-info";
        edit_accept.innerText = "Save";
        edit_accept.style.cssFloat = "right";
        edit_accept.onclick = function () {
          editPost(postid.value, edit_textarea.value);
        }
        edit_footer.appendChild(edit_accept);
        isEditClick = true;
      }
      else {
        while (content_text.firstElementChild) {
          content_text.removeChild(content_text.firstElementChild);
        }
        var paragraph = document.createElement("p");
        paragraph.innerText = temptext;
        content_text.appendChild(paragraph);
        isEditClick = false;
      }
    }
    var delete_button = document.createElement("a");
    delete_button.className = "icon-button";
    delete_button.innerHTML = '<i class="material-icons">clear</i> ';
    writer_follow.appendChild(delete_button);
    writer_follow.style.marginRight = "5px";
    delete_button.onclick = function () {
      deletePost(postid.value);
    }
  }
  else {
    //add follow_button
    var follow_button = document.createElement("button");
    writer_follow.appendChild(follow_button);
    //if(is followed) button.innerText = "followed"
    follow_button.innerText = "Followed";
    follow_button.className = "button is-rounded is-info";
    follow_button.parentElement = post_writer;
    var isfollowed = true;
    follow_button.onclick = function () {
      if (isfollowed) {
        this.innerText = "Followed";
        isfollowed = false;
      }
      else {
        this.innerText = "Follow";
        isfollowed = true;
      }
      var r = confirm("Are you sure?");
      form.action = "/tryfollow";
      if (r === true)
      form.submit();
    }
  }

  /*  Input all the information of post  */
  writer.innerText = Post.writer;//set writer's name
    text.innerText = Post.text; //set content text
    timestamp_time.innerText = Post.Calc_timestamp();
    //if writer image is not ready, set writer image default
    if (typeof Post.writerImage !== 'object') {
      writerImage.src = "/images/default-writerImage.png";
    }
  else writerImage = Post.writerImage;
  if (Post.images.length !== 0) {
    for (i = 0; i < Post.images.length; i++) {
      image_box.appendChild(Post.images[i]);
    }
    image_box.style.paddingBottom = "15px";
  }
  
}
function implementComment(Comments, where , Post) {

  var comments_box = document.createElement("div");
  comments_box.className = "comments-box";
  where.appendChild(comments_box);
  hr_comment = document.createElement("hr");
  hr_comment.style.marginTop = "0px";
  hr_comment.style.marginBottom = "10px";
  comments_box.appendChild(hr_comment);
  //at first add posting comment
  implementWriteComment(comments_box, Post);

  for (i = Comments.length-1; i >= 0; i--) {

    var comment = document.createElement("article");
    comment.className = "media comment";
    comments_box.appendChild(comment);

    let commentid = document.createElement("input");
    commentid.type = "hidden";
    commentid.name = "commentid";
    commentid.value = Comments[i].commentid;
    comment.appendChild(commentid);

    var uid = document.createElement("input");
    uid.type = "hidden";
    uid.name = "uid";
    uid.value = Comments[i].uid; // need uid from server
    comment.appendChild(uid);

    let postid = document.createElement("input");
    postid.type = "hidden";
    postid.name = "postId";
    postid.value = Post.postid; 
    comment.appendChild(postid);

    var comment_writer = document.createElement("div");
    comment_writer.className = "comment-writer";
    comment.appendChild(comment_writer);

    var comment_writer_left = document.createElement("div");
    comment_writer_left.className = "comment-writer-left";
    comment_writer.appendChild(comment_writer_left);

    var commentWriterImage = document.createElement("img");
    commentWriterImage.className = "comment-writer-image";
    commentWriterImage.onclick = function () {
      goProfile(uid.value);
    }
    comment_writer_left.appendChild(commentWriterImage);

    var comment_writer_right = document.createElement("div");
    comment_writer_right.className = "comment-writer-right";
    comment_writer.appendChild(comment_writer_right);


    var commentWriter = document.createElement("span");
    commentWriter.className = "commentWriter";
    commentWriter.onclick = function () {
      goProfile(uid.value);
    }
    comment_writer_right.appendChild(commentWriter);

    var currid = document.getElementById("uid").value;
    if (uid.value === currid) {
      var commentdel = document.createElement("a");
      commentdel.style = "float:right;margin-right:5px";
      commentdel.innerHTML = '<i class="material-icons">highlight_off</i>';
      commentdel.onclick = function () {
        deleteComment(postid.value, commentid.value);
      }
      comment_writer_right.appendChild(commentdel);
    }

    var comment_content = document.createElement("div");
    comment_content.className = "content";
    comment.appendChild(comment_content);

    var comment_textbox = document.createElement("p");
    comment_content.appendChild(comment_textbox);
    comment_textbox.className = "comment-textbox";

    var commentText = document.createElement("span");
    commentText.className = "comment-text";
    comment_textbox.appendChild(commentText);

    var currentComment = Comments[i];
    commentText.innerText = currentComment.text;
    commentWriter.innerText = currentComment.writer;
    if (typeof currentComment.writerImage !== 'object') {
      commentWriterImage.src = "/images/default-writerImage.png";
    }
    else commentWriterImage.src = currentComment.writerImage.src;
  }
}
function implementWritePost() {
  var timeline_posts = document.getElementsByClassName("timeline-posts")[0];
  var post = document.createElement("article");
  post.className = "post";
  timeline_posts.appendChild(post);

  var box = document.createElement("div");
  box.className = "post-writer";
  post.appendChild(box);

  var box_left = document.createElement("div");
  box_left.className = "write-post-left";
  box.appendChild(box_left);

  var writerImage = document.createElement("img");
  writerImage.className = "write-writer-image";
  writerImage.src = "/images/default-writerImage.png";
  writerImage.style.cursor = "defalut";
  box_left.appendChild(writerImage);

  var box_right = document.createElement("div");
  box_right.className = "write-post-right";
  box.appendChild(box_right);

  var form = document.createElement("form");
  form.action = "/createPost";
  form.method = "post";
  box_right.appendChild(form);

  var textarea = document.createElement("textarea");
  textarea.className = "write-post-textarea";
  textarea.placeholder = "Write here";
  textarea.name = "text";
  form.appendChild(textarea);
  var isclick = false;
  textarea.onclick = function () {
    if (isclick === true) return;
    textarea.style.height = "130px";
    isclick = true;
  };
  var preview = document.createElement("div");
  post.appendChild(preview);

  var imgInput = document.createElement("input");
  imgInput.type = "hidden";
  imgInput.name = "img_url";
  form.appendChild(imgInput);
  
  var box_under = document.createElement("div");
  box_under.style.width = "100%";
  box_under.style.paddingBottom = "3px";
  box_under.style.display = "inline-block";
  post.appendChild(box_under);

  var postButton = document.createElement("button");
  postButton.className = "button is-info write-post-button";
  postButton.innerText = "Post";
  postButton.onclick = function () {
    var resultarray = [];
    var temparray = imgfiles.toString().split(",");
    for (var i = 0; i < temparray.length; i++) {
      if (i % 2 === 1) {
        resultarray.push(temparray[i]);
      }
    }
    imgInput.value = resultarray;
    form.submit();
  };
  box_under.appendChild(postButton);

  var writeButtonBox = document.createElement("div");
  writeButtonBox.className = "write-button-box";
  box_under.appendChild(writeButtonBox);

  var buttonsform = document.createElement("form");
  writeButtonBox.appendChild(buttonsform);
  buttonsform.method = "post";

  var imagePostbutton = document.createElement("div");
  imagePostbutton.className = "img-button";
  buttonsform.appendChild(imagePostbutton);

  var label = document.createElement("label");
  label.htmlFor = "img_file";

  
  label.name = "images";
  label.innerHTML = "<i class='material-icons' style='font-size:30px'>add_a_photo</i>";
  imagePostbutton.appendChild(label);

  var imgfiles = [];
  
  var imgUpload = document.createElement("input");
  imgUpload.type = "file";
  imgUpload.id = "img_file";
  imgUpload.multiple = true;
  imagePostbutton.appendChild(imgUpload);
  imgUpload.onchange = function () {
    if (imgUpload.files[0].type.match(/image.*/)) {
      var reader = new FileReader();
      var img = document.createElement("img");
      img.className = "preview-image";
      preview.appendChild(img);
      preview.className = "post-preview";
      reader.onload = function (e) {
        img.src = e.target.result;
        imgfiles.push(img.src);
      }
      reader.readAsDataURL(imgUpload.files[0]);
    }
    else {
      alert("Wrong file selected\n Please upload image file");
    }
  };
  
}
function implementWriteComment(comments_box , Post) {
  var form = document.createElement("form");
  form.action = "/submitComments";
  form.method = "post";
  comments_box.appendChild(form);

  var comment = document.createElement("article");
  comment.className = "media comment";
  form.appendChild(comment);

  var write_comment = document.createElement("div");
  write_comment.className = "write-comment";
  comment.appendChild(write_comment);

  var write_comment_left = document.createElement("div");
  write_comment_left.className = "write-comment-left";
  write_comment.appendChild(write_comment_left);

  var write_comment_image = new Image();
  write_comment_image.src = "/images/default-writerImage.png";
  write_comment_image.className = "comment-write-writer-image";
  write_comment_left.appendChild(write_comment_image);

  var write_comment_right = document.createElement("div");
  write_comment_right.className = "write-comment-right";
  write_comment.appendChild(write_comment_right);

  var textarea = document.createElement("textarea");
  textarea.className = "write-post-textarea";
  textarea.placeholder = "Write here";
  textarea.name = "text";
  write_comment_right.appendChild(textarea);
  textarea.onclick = function () {
    textarea.style.height = "80px";
    comment.style.height = "130px";
  };

  var postid = document.createElement("input");
  postid.type = "hidden";
  postid.name = "postId";
  postid.value = Post.postid;
  form.appendChild(postid);

  var uid = document.createElement("input");
  uid.type = "hidden";
  uid.name = "uid";
  uid.value = Post.userid;
  form.appendChild(uid);

  var box_under = document.createElement("div");
  box_under.style.width = "100%";
  box_under.style.paddingBottom = "3px";
  box_under.style.height = "60px";
  comment.appendChild(box_under);

  var write_comment_button = document.createElement("button");
  write_comment_button.className = "button is-info write-post-button";
  write_comment_button.innerText = "Post";
  write_comment_button.style = "margin-right:10px";
  write_comment_button.onclick = function () {
    form.submit();
  }
  box_under.appendChild(write_comment_button);
}
function JSONtoPost(JSONstring) {
  var JSONobj = JSON.parse(JSONstring);
  Object.keys(JSONobj).sort().forEach(function (k) {
    var post = JSONobj[k];
    var pid = post['postId'];
    var uid = post['uid'];
    var text = post['text'];
    var image = post['url'];
    var name = post['name'];
    var userimage = post['photourl'];
    var mpost = new Post(name, text);
    mpost.postid = pid;
    mpost.userid = uid;
    mpost.setTime(parseInt(pid)); 
    /*if (image) {
      mpost.images = image.split(",");
    }
    if (userimage) {
      mpost.writerImage = userimage;
    }*/
    var comments = post['comments'];
    if (comments !== undefined) {
      Object.keys(comments).forEach(function (ckey) {
        var mcomment = new Comment();
        var comment = comments[ckey];
        mcomment.text = comment['text'];
        mcomment.writer = comment['name'];
        if (comment['photourl'] !== null) {
          mcomment.writerImage = comment['photourl'];
        }
        mcomment.uid = comment['uid'];
        mcomment.postid = pid;
        mcomment.commentid = ckey;
        mpost.addComment(mcomment);
      })
    }
    createPost(mpost);
  });
}

function JSONtoSub(JSONstring) {
  var JSONobj = JSON.parse(JSONstring);
  Object.keys(JSONobj).forEach(function (k) {
    var friend = JSONobj[k];
    var name = friend['name'];
    var uid = friend['uid'];
    var url = friend['photourl'];
    var mfriend = new Friend(name, url);
    mfriend.uid = uid;
    friend_list.push(mfriend);
  });
}

window.onload = function () {
  var youpost = document.getElementById("jsonpost").value;
  JSONtoPost(youpost);
  var subscribes = document.getElementById("jsonsubs").value;
  JSONtoSub(subscribes);
  implementWritePost();
  if (window.innerWidth > 950) {
    implementProfile();
  }
  if (window.innerWidth > 1250 || document.getElementsByClassName("timeline-profile").length === 0) {
    implementFriends();
  }
  for (var i = posts.length-1; i >= 0; i--) {
    implementPost(posts[i]);
  }
};



$(window).resize(function () {
  var profileBox = document.getElementsByClassName("timeline-profile")[0];
  if (window.innerWidth > 950) {
    if (profileBox.childElementCount === 0) {
      implementProfile();
    }
  }
  else {
    profileBox.removeChild(profileBox.firstElementChild);
  }

})

$(window).resize(function () {
  var friendsBox = document.getElementsByClassName("timeline-friends")[0];
  if (window.innerWidth > 1250) {
    if (friendsBox.childElementCount === 0) {
      implementFriends();
    }
  }
  else {
    friendsBox.removeChild(friendsBox.firstElementChild);
  }
})

function implementProfile() {
  if (document.getElementsByClassName("timeline-profile").length === 0) {
    return;
  }

  var profileBox = document.getElementsByClassName("timeline-profile")[0];
  var profile = document.createElement("div");
  profile.className = "profile-box";
  profileBox.appendChild(profile);

  var profile_first = document.createElement("div");
  profile_first.className = "profile-first";
  profile.appendChild(profile_first);

  var profile_image = new Image();
  profile_image.className = "profile-image";
  if (!(document.getElementById("photourl").value))
    profile_image.src = "/images/default-writerImage.png";
  else
    profile_image.src = document.getElementById("photourl").value;
  profile_image.onclick = function () {
    location.href = '/profile';
  };
  profile_first.appendChild(profile_image);

  //contains profile name
  var profile_second = document.createElement("div");
  profile_second.className = "profile-second";
  profile_second.innerText = document.getElementById("name").value;
  profile.appendChild(profile_second);

  //contains followers and friends number
  var profile_third = document.createElement("div");
  profile_third.className = "profile-third";
  profile_third.innerText = " friends : " + friend_list.length;
  profile.appendChild(profile_third); 
}

function implementFriends() {
  if (document.getElementsByClassName("timeline-friends").length === 0) {
    return;
  }
  

  var friendsBox = document.getElementsByClassName("timeline-friends")[0];

  var friends = document.createElement("div");
  friends.className = "friends";
  friendsBox.appendChild(friends);

  for (var i = 0; i < friend_list.length; i++) {
    var friend = document.createElement("div");
    friend.className = "friend";
    friends.appendChild(friend);

    let uid = document.createElement("input");
    uid.type = "hidden";
    uid.value = friend_list[i].uid;
    uid.name = "uid";
    friend.appendChild(uid);

    friend.onclick = function () {
      goProfile(uid.value);
    };

    var friend_left = document.createElement("div");
    friend_left.className = "friend-left";
    friend.appendChild(friend_left);

    var friend_image = new Image();
    friend_image.className = "friend-image";
    friend_image.src = friend_list[i].image;
    friend_left.appendChild(friend_image);

    var friend_right = document.createElement("div");
    friend_right.className = "friend-right";
    friend_right.innerText = friend_list[i].name;
    friend.appendChild(friend_right);
  }
}


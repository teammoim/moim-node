
function Post(writer = "unknown", text = "", images = []) {
  this.writer = writer;
  this.writerImage;
  this.time = new Date();
  this.text = text;
  this.images = [];
  this.likes = 0;
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
  this.writerImage;
  this.time = new Date();
  this.text = "";
  this.likes = 0; 
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

var posts = [];

function createPost(Post) {
  posts.push(Post);
}



function commentClick(Comments_array, where) {
  var comment_box = where.getElementsByClassName("comments-box");
  if (comment_box.length !== 0) {

    where.removeChild(comment_box[0]);
  }
  else {
    if (Comments_array.length > 0) {
      implementComment(Comments_array, where);
    }
  }
}

function implementPost(Post) {
    /*   connect all box and inline tags  */
    var timeline_posts = document.getElementsByClassName("timeline-posts")[0];
    var post = document.createElement("article");
    post.className = "post";
    timeline_posts.appendChild(post);

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
    writer_left.appendChild(writerImage);

    var writer_right = document.createElement("div");
    writer_right.className = "writer-right";
    post_writer.appendChild(writer_right);

    //in writer-right tag
    var writer = document.createElement("span");
    writer.className = "writer";
    writer_right.appendChild(writer);
    var br = document.createElement("br");
    writer_right.appendChild(br);

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
    '<a class="level-item" style="margin-bottom:5px;" >' +
    '  <span class="icon is-small"><i class="level material-icons">favorite</i></span>' +
    '   Like' +
    '          </a >' +
    '<a class="level-item" style="margin-bottom:5px;">' +
    '  <span class="icon is-small"><i class="level material-icons">mode_comment</i></span>' +
    '    Comment' +
    '          </a>' +
    '<a class="level-item" style="margin-bottom:5px;">' +
    '  <span class="icon is-small"><i class="level material-icons">share</i> </span>' +
    '   Share' +
    '          </a>';
    var likeButton = level.getElementsByClassName("level-item")[0];
    var commentButton = level.getElementsByClassName("level-item")[1];
    var shareButton = level.getElementsByClassName("level-item")[2];
    media_content.appendChild(level);
  /* add event listeners to button */

  commentButton.onclick = function () {
    commentClick(Post.comments, post);
  };


  /*  Input all the information of post  */
    writer.innerText = Post.writer;//set writer's name
    text.innerText = Post.text; //set content text
    timestamp_time.innerText = Post.Calc_timestamp();
    //if writer image is not ready, set writer image default
    if (typeof Post.writerImage !== 'object') {
      writerImage.src = "images/default-writerImage.png";
    }
  else writerImage = Post.writerImage;
  if (Post.images.length !== 0) {
    for (i = 0; i < Post.images.length; i++) {
      image_box.appendChild(Post.images[i]);
    }
    image_box.style.paddingBottom = "15px";
  }
  
}
function implementComment(Comments, where) {

  var comments_box = document.createElement("div");
  comments_box.className = "comments-box";
  where.appendChild(comments_box);
  hr_comment = document.createElement("hr");
  hr_comment.style.marginTop = "0px";
  hr_comment.style.marginBottom = "10px";
  comments_box.appendChild(hr_comment);

  for (i = 0; i < Comments.length; i++) {

    var comment = document.createElement("article");
    comment.className = "media comment";
    comments_box.appendChild(comment);

    var comment_writer = document.createElement("div");
    comment_writer.className = "comment-writer";
    comment.appendChild(comment_writer);

    var comment_writer_left = document.createElement("div");
    comment_writer_left.className = "comment-writer-left";
    comment_writer.appendChild(comment_writer_left);

    var commentWriterImage = document.createElement("img");
    commentWriterImage.className = "comment-writer-image";
    comment_writer_left.appendChild(commentWriterImage);

    var comment_writer_right = document.createElement("div");
    comment_writer_right.className = "comment-writer-right";
    comment_writer.appendChild(comment_writer_right);

    var commentWriter = document.createElement("span");
    comment_writer_right.appendChild(commentWriter);

    var comment_content = document.createElement("div");
    comment_content.className = "content";
    comment.appendChild(comment_content);

    var comment_textbox = document.createElement("p");
    comment_textbox.className = "comment-textbox";
    comment_content.appendChild(comment_textbox);

    var commentText = document.createElement("span");
    commentText.className = "comment-text";
    comment_textbox.appendChild(commentText);

    var currentComment = Comments[i];
    commentText.innerText = currentComment.text;
    commentWriter.innerText = currentComment.writer;
    if (typeof currentComment.writerImage !== 'object') {
      commentWriterImage.src = "images/default-writerImage.png";
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
  writerImage.className = "writer-image";
  writerImage.src = "images/default-writerImage.png";
  box_left.appendChild(writerImage);

  var box_right = document.createElement("div");
  box_right.className = "write-post-right";
  box.appendChild(box_right);

  var textarea = document.createElement("textarea");
  textarea.className = "write-post-textarea";
  textarea.placeholder = "Write here";
  box_right.appendChild(textarea);
  textarea.onclick = function () {
    textarea.style.height = "130px";
  };
  var box_under = document.createElement("div");
  box_under.style.width = "100%";
  box_under.style.paddingBottom = "3px";
  post.appendChild(box_under);

  var postButton = document.createElement("button");
  postButton.className = "write-post-button";
  postButton.innerText = "Post";
  postButton.onclick = function () {
    var time = new Date();
    var toString = "testname" + ";|;" + textarea.value + ";|;" +
      time.getFullYear() + ";" + time.getMonth() + ";" + time.getDate() + ";"+
    time.getHours() + ";" + time.getMinutes() + ";" + time.getSeconds();
    localStorage.setItem(localStorage.length, toString);
    location.reload();
  };
  box_under.appendChild(postButton);

}
function implementLocalstorage() {
  for (var i = localStorage.length - 1; i >= 0; i--) {
    var value = localStorage.getItem(i);
    
    var parse = value.split(";|;");
    var newPost = new Post(parse[0], parse[1]);
    var arrd = parse[2].split(";"); //toString of Date to array
    newPost.setTime(arrd[0], arrd[1], arrd[2], arrd[3], arrd[4], arrd[5]);
    implementPost(newPost);
  }
}

//testcase
var james = new Post("james", "My name is james");
james.setTime(2018, 9, 3, 4, 32, 0);


var an = new Post();
an.writer = "An";
an.text = "this is post";
an.setTime(2018, 9, 3, 1, 12, 10);

var jang_comment = new Comment();
an.addComment(jang_comment);
james.addComment(jang_comment);
jang_comment.writer = "Jang";
jang_comment.text = "this is comment";

var jang_comment2 = new Comment();
an.addComment(jang_comment2);
jang_comment2.writer = "Jang";
jang_comment2.text = "And this is comment2";


var jin = new Post("jin", "my name is jin", ["images/logo.png", "images/logo.png"]);
jin.setTime(2018, 9, 2, 23, 46, 0);
createPost(james);
createPost(jin);
createPost(an);

//

window.onload = function () {
  var clearButton = document.createElement("button");
  clearButton.innerText = "Clear ";
  clearButton.onclick = function () {
    localStorage.clear();
  };
  document.body.appendChild(clearButton);
  implementWritePost();
  implementLocalstorage();
  for (var i = 0; i < posts.length; i++) {
    implementPost(posts[i]);
  } 
};



function Post() {
  this.writer = "";
  this.writerImage;
  this.time = new Date();
  this.text = "";
  this.images = [];
  this.likes = 0;
  this.presslike = false;
  this.comments = []; //  argument : Comment
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



var posts = [];
function createPost(Post) {
  posts.push(Post);
}

function implementComment(Comments, where) {
  
  var comments_box = document.createElement("div");
  comments_box.className = "comments-box";
  where.appendChild(comments_box);
  hr_comment = document.createElement("hr");
  hr_comment.style.marginTop = "10px";
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

    //in writer-right tag
    var timestamp = document.createElement("span");
    timestamp.className = "timestamp";
    writer_right.appendChild(timestamp);

    var content = document.createElement("div");
    media_content.appendChild(content);

    //in content tag
    var content_text = document.createElement("div");
    content_text.className = "content-text";
    content.appendChild(content_text);

    var text = document.createElement("p");
    text.style.paddingTop = "1em";
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
    '<a class="level-item" >' +
    '  <span class="icon is-small"><i class="level material-icons">favorite</i></span>' +
    '   Like' +
    '          </a >' +
    '<a class="level-item">' +
    '  <span class="icon is-small"><i class="level material-icons">mode_comment</i></span>' +
    '    Comment' +
    '          </a>' +
    '<a class="level-item">' +
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
  }


  /*  Input all the information of post  */
    writer.innerText = Post.writer;//set writer's name
    text.innerText = Post.text; //set content text
    //if writer image is not ready, set writer image default
    if (typeof Post.writerImage !== 'object') {
      writerImage.src = "images/default-writerImage.png";
    }
  else writerImage = Post.writerImage;
  if (Post.images.length !== 0) {
    for (i = 0; i < Post.images.length; i++) {
      image_box.appendChild(Post.images[i]);
    }
  }
  /* compose comment*/
  
}

//testcase
var james = new Post();

james.setWriter("james");
james.setText("My name is james");



var jin = new Post();
jin.writer = "jin";
jin.text = "my name is jin";
moim = new Image();
moim.src = "images/logo.png";
jin.addImage(moim);

var an = new Post();
an.writer = "An";
an.text = "this is post";
var jang_comment = new Comment();
an.addComment(jang_comment);
jang_comment.writer = "Jang";
jang_comment.text = "this is comment";
var jang_comment2 = new Comment();
an.addComment(jang_comment2);
jang_comment2.writer = "Jang";
jang_comment2.text = "And this is comment2";

createPost(james);
createPost(jin);
createPost(an);

//

window.onload = function () {
  for (var i = 0; i < posts.length; i++) {
    implementPost(posts[i]);
  }
};


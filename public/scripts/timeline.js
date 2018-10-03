
function Post() {
  this.writer = "";
  this.writerImage;
  this.time = new Date();
  this.text = "";
  this.images = [];
  this.likes = 0;
  this.presslike = false;
  this.comments = new Object();
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
Post.prototype.pushImage = function (Image) {
  this.images.push(Image);
}
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

function implementPost(Post) {
    /*   connect all box and inline tags  */
    var timeline_posts = document.getElementsByClassName("timeline-posts")[0];
    
    var post = document.createElement("article");
    post.className = "post media";
    timeline_posts.appendChild(post);

    var media_content = document.createElement("div");
    media_content.className = "media-content";
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
    var timestamp = document.createElement("span");
    timestamp.className = "timestamp";
    writer_right.appendChild(timestamp);

    var timestamp_time = document.createElement("small");
    timestamp_time.className = "timestamp_time";
    writer_right.appendChild(timestamp_time);

    var content = document.createElement("div");
    content.className = "content";
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
    var like = level.getElementsByClassName("level-item")[0];
    var comment = level.getElementsByClassName("level-item")[1];
    var share = level.getElementsByClassName("level-item")[2];
    media_content.appendChild(level);
    /*  Input all the information of post  */

    writer.innerText = Post.writer;//set writer's name
    text.innerText = Post.text; //set content text
    timestamp.innerText = "@" + Post.writer + " ";
    timestamp_time.innerText = Post.Calc_timestamp();
    //if writer image is not ready, set writer image default
    if (typeof Post.writerImage !== 'object') {
      writerImage.src = "images/default-writerImage.png";
    }
  else writerImage = Post.writerImage;
  if (Post.images.length !== 0) {
    for (var i = 0; i < Post.images.length; i++) {
      image_box.appendChild(Post.images[i]);
    }
  }
}

//testcase
var james = new Post();

james.setWriter("james");
james.setText("My name is james");
james.setTime(2018, 9, 3, 4, 32, 0);



var jin = new Post();
jin.writer = "jin";
jin.text = "my name is jin";
jin.setTime(2018, 9, 3, 23, 46, 0);
moim = new Image();
moim.src = "images/logo.png";
jin.setImage(moim);

createPost(james);
createPost(jin);

//

window.onload = function () {
  for (var i = 0; i < posts.length; i++) {
    implementPost(posts[i]);
  }
};


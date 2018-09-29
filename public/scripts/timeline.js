
function Post() {
  this.writer = "";
  this.writerImage;
  this.timestamp;
  this.time = new Date();
  this.text = "";
  this.image;
  this.likes = 0;
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
/* function associated image will be composed*/



function createPost(Post) {
  
  window.onload = function () {

    /*   connect all box and inline tags  */
    var posts = document.getElementsByClassName("timeline-posts")[0];
    var post = document.createElement("article");
    post.className = "post media";
    posts.appendChild(post);

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

    //in writer-right tag
    var timestamp = document.createElement("span");
    timestamp.className = "timestamp";
    writer_right.appendChild(timestamp);

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
      '<div class="level-left">' +
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
      '          </a>' +
      '        </div >';
    var like = level.getElementsByClassName("level-item")[0];
    var comment = level.getElementsByClassName("level-item")[1];
    var share = level.getElementsByClassName("level-item")[2];
    media_content.appendChild(level);
    /*  Input all the information of post  */

    writer.innerText = Post.writer;//set writer's name
    text.innerText = Post.text; //set content text
    //if writer image is not ready, set writer image default
    if (typeof Post.writerImage !== 'object') {
      writerImage.src = "images/default-writerImage";
    }
    else writerImage = Post.writerImage;


    /* calculate timestamp */
  };

}

//testcase
var james = new Post();

james.setWriter("james");
james.text = "My name is james";
createPost(james);

var apiUrl = "https://lab.mrhmt.com"
var domainName = window.location.hostname;
var pathName = window.location.pathname.replace(/\//g, '');

function sendComment() {
  var content = $("#custom-comment-content").val();
  var name = $("#custom-comment-name").val();
  var email = $("#custom-comment-email").val();
  $.ajax({
    url: `${apiUrl}/api/comments`,
    type: 'POST',
    data: JSON.stringify({
      Domain: domainName,
      Path: pathName,
      Content: content,
      Name: name,
      Email: email
    })
  }).done(function () {
    // Reload
    getComment();

    // Clear
    $("#custom-comment-content").val("");

    // Save user
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
  }).fail(function() {
    alert("Comment fail!!");
  });
}

function getComment() {
  $.get(`${apiUrl}/api/comments/${domainName}/${pathName}`, function (data) {
    var comments = data.reverse();

    if (comments.length) {
      // Clear div
      $("div.custom-comment-list").html("");

      // Parse to div
      comments.map(function (el) {
        $("div.custom-comment-list").append(`
          <div class="custom-comment-element">
            <div class="custom-comment-element-avatar">
              <a href="#"><img src="https://avatars0.githubusercontent.com/u/0"></a>
            </div>
            <div class="custom-comment-element-content">
              <div class="custom-comment-element-header">
                <a href="mailto:${el.email}"><span class="custom-comment-element-author">${el.name}</span></a> wrote on ${el.createdAt.replace('Z', ' ').replace('T', ' ')}
              </div>
              <div class="custom-comment-element-body">
                ${el.content}
              </div>
            </div>
          </div>
        `);
      });
    } else {
      $("div.custom-comment-list").html("No comment.");
    }
  });
}

function checkUserLogged() {
  // Check user data
  if (localStorage.name && localStorage.email) {
    $("#custom-comment-name").val(localStorage.name);
    $("#custom-comment-email").val(localStorage.email);

    // Hide
    $("#custom-comment-name").hide();
    $("#custom-comment-email").hide();

    // Change button value
    $("#custom-comment-button").html(`Comment via ${localStorage.name}`)

    // Change holder info
    $(".custom-comment-holder-info").html(`You're logged in with <strong>${localStorage.email}</strong>`);
  }
}

function initHTML() {
  $("head").append(`<link rel="stylesheet" href="//mrhmt.com/custom-comment/custom-comment.css">`);
  $("#custom-comment-box").append(`
  <div class="custom-comment-headline">
    Comment Box
  </div>
  <div class="custom-comment-description">
    I strongly recommended you to keep your keyboard and surf as fast as possible through this area.
  </div>

  <div class="custom-comment-holder">
    <div class="custom-comment-holder-avatar">
      <img id="login-avatar" src="https://avatars0.githubusercontent.com/u/0">
    </div>
    <div class="custom-comment-holder-input">
      <input type="text" name="name" id="custom-comment-name" placeholder="Your Name" />
      <input type="email" name="email" id="custom-comment-email" placeholder="name@company.com" />
      <textarea id="custom-comment-content" rows="3" placeholder="Write something for me"></textarea>

      <div class="custom-comment-holder-action">
        <div class="custom-comment-holder-info">Enter your name and email only once.</div>
        <button id="custom-comment-button" class="custom-comment-button" onclick="sendComment();">Give a comment</button>
      </div>
    </div>
  </div>

  <div class="custom-comment-list">
    No comment.
  </div>
  `);
}

function init() {
  initHTML();
  checkUserLogged();
  getComment();
}

$(document).ready(init());
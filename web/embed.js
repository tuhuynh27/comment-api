var apiUrl = "https://lab.mrhmt.com/api";
var domainName = window.location.hostname;
var pathName = window.location.pathname.replace(/\//g, '');

var getJSON = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

var postJSON = function (url, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    xhr.send(JSON.stringify(data));

    xhr.onloadend = function () {
        callback(null, xhr.response);
    };
};

function initHTML() {
    // Add CSS File
    var cssFile = document.createElement('link');
    cssFile.rel = 'stylesheet';
    cssFile.href = 'https://mrhmt.com/custom-comment/custom-comment.css';
    document.getElementsByTagName('head')[0].appendChild(cssFile);

    // Add HTML
    var htmlDiv = document.createElement('div');
    var htmlCommentBox = "<div class='custom-comment-headline'> Comment Box </div><div class='custom-comment-description'> I strongly recommended you to keep your keyboard and surf as fast as possible through this area. </div><div class='custom-comment-holder'> <div class='custom-comment-holder-avatar'> <img id='login-avatar' src='https://avatars0.githubusercontent.com/u/0'> </div><div class='custom-comment-holder-input'> <input type='text' name='name' id='custom-comment-name' placeholder='Your Name'/> <input type='email' name='email' id='custom-comment-email' placeholder='name@company.com'/> <textarea id='custom-comment-content' rows='3' placeholder='Write something for me'></textarea> <div class='custom-comment-holder-action'> <div class='custom-comment-holder-info'>Enter your name and email only once.</div><button id='custom-comment-button' class='custom-comment-button' onclick='sendComment();'>Give a comment</button> </div></div></div><div class='custom-comment-list'> No comment. </div>";
    htmlDiv.innerHTML = htmlCommentBox;
    document.getElementById('custom-comment-box').appendChild(htmlDiv);
}

function getComment() {
    getJSON(apiUrl + '/comments/' + domainName + '/' + pathName, function (err, data) {
        if (err != null) {
            console.log('Error code = ', err);
        } else {
            var comments = data.reverse();
            if (comments.length) {
                // Clear div
                document.getElementsByClassName('custom-comment-list')[0].innerHTML = '';

                // Parse to div
                comments.map(function (el) {
                    var htmlDiv = document.createElement('div');
                    var timeSpan = new Date(el.createdAt);
                    var timeSpanString = timeSpan.getDate() + "-" + (timeSpan.getMonth() + 1) + "-" + timeSpan.getFullYear() + " " + timeSpan.getHours() + ":" + timeSpan.getMinutes();
                    var htmlCommentElement = "<div class='custom-comment-element'> <div class='custom-comment-element-avatar'> <a href='#'><img src='https://avatars0.githubusercontent.com/u/0'></a> </div><div class='custom-comment-element-content'> <div class='custom-comment-element-header'> <a href='mailto:" + el.email + "'><span class='custom-comment-element-author'>" + el.name + "</span></a> wrote on " + timeSpanString + "</div><div class='custom-comment-element-body'>" + el.content + "</div></div></div>";
                    htmlDiv.innerHTML = htmlCommentElement;
                    document.getElementsByClassName('custom-comment-list')[0].appendChild(htmlDiv);
                });
            } else {
                document.getElementsByClassName('custom-comment-list')[0].innerHTML = 'No comment.';
            }
        }
    });
}

function sendComment() {
    var content = document.getElementById('custom-comment-content').value;
    var name = document.getElementById('custom-comment-name').value;
    var email = document.getElementById('custom-comment-email').value;

    var newComment = {
        domain: domainName,
        path: pathName,
        content: content,
        name: name,
        email: email
    };

    postJSON(apiUrl + '/comments', newComment, function (data) {
        // Reload
        getComment();

        // Clear
        document.getElementById('custom-comment-content').value = '';

        // Save user
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
    });
}

function checkUserLogged() {
    // Check user data
    if (localStorage.name && localStorage.email) {
        document.getElementById('custom-comment-name').value = localStorage.name;
        document.getElementById('custom-comment-email').value = localStorage.email;

        // Hide
        document.getElementById('custom-comment-name').style.display = 'none';
        document.getElementById('custom-comment-email').style.display = 'none';

        // Change button value
        document.getElementById('custom-comment-button').innerHTML = 'Comment via ' + localStorage.name;

        // Change holder info
        document.getElementsByClassName('custom-comment-holder-info')[0].innerHTML = 'You are logged in with <strong>' + localStorage.email + '</strong>';
    }
}

function init() {
    initHTML();
    getComment();
    checkUserLogged();
}

document.onload = init();
function showPosts(item, user_id) {
    $('.profile-view-posts').hide();
    $(item).show();
}


function loadPosts(user_id) {
    $.get('http://127.0.0.1:8000/profiles/posts/user=' + user_id + '/' , function(result){
    $("#viewPosts").html(result);
    }
)}


function loadImages(user_id) {
    $.get('http://127.0.0.1:8000/profiles/images/user='+ user_id + '/' , function(result){
    $("#viewPosts").html(result);
    }
)}

function loadAdd(user_id) {
    $.get('http://127.0.0.1:8000/profiles/post/add/' , function(result){
    $("#viewPosts").html(result);
    }
)}

function loadEdit(user_id) {
    $.get('http://127.0.0.1:8000/users/config/' , function(result){
    $("#viewPosts").html(result);
    }
)}


function loadFriends(user_id) {
    $.get('http://127.0.0.1:8000/profiles/friends/id=' + user_id + '/', function(result){
    $("#viewPosts").html(result);
    }
)}

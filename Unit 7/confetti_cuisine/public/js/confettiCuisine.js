$(document).ready(()=>{
  $("#modal-button").click(()=>{
    $(".modal-body").html('');
    $.get("/courses?format=json", (data) => {
      data.forEach((course) => {
        $(".modal-body").append(`<div class='course-item'>
        <span>${course.name}</span>
        <span>$${course.cost}</span>
        <div>${course.description}</div>
        <a href="/courses/${course._id}/enroll">
        <button class="btn btn-info btn-sm" >Enroll</button>
        </a>
        </div>`);
      });
    })
  });

  var socket = io();

  $('#chatForm').submit(() => {
    let text = $('#chat_input').val(),
    userName = $('#chat_user_name').val(),
    userId = $('#chat_user_id').val();
    socket.emit('message', {content: text, userName: userName, userId: userId});
    $('#chat_input').val('');
    return false;
  });

  socket.on('message', (message) => {
    displayMessage(message);
    for(let i = 0; i< 2; i++){
      $('.chat-icon').fadeOut(200).fadeIn(200);
    }
  });

  socket.on('user disconnected', (message) => {
    displayMessage({userName: "Notice", content: "user left the chat"});
  });

  socket.on('load all messages',(data) => {
    data.forEach( message => {
      displayMessage(message);
    })
  });

  function displayMessage(message){
    $('#chat').prepend($('<li>').html(`<strong class='message ${getCurrentUserClass(message.user)}'> ${message.userName}</strong>: ${message.content}`));
  }

  function getCurrentUserClass(id) {
    let userId = $('#chat_user_id').val();
    if (userId === id) return "currentUser";
    else return "";
  }

});

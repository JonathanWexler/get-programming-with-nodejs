'use strict';

var socket = io();

$(document).ready(()=>{
  $("#modal-button").click(()=>{
    $(".modal-body").html('');

    $.get("/api/courses", (results) => {
      if (results['status'] === 500) return;
      let data = results['data'];
      data.forEach((course) => {
        $(".modal-body").append(`<div>
          <span>${course.title}</span>
          <span>$${course.cost}</span>
          <div>${course.description}</div>
          <button class="join-button btn btn-info btn-sm" data-id="${course._id}">Join</button>
          </div>`);
        });
        addJoinButtonListener();
      });
    });

    function addJoinButtonListener() {
      $(".join-button").click((e)=>{
        let button = $(e.target),
        courseId = button.data('id');
        $.get(`/api/courses/${courseId}/join`, (data) => {
          if (data.success) {
            button.text('Joined');
            button.css({'backgroundColor': 'green'});
            button.removeClass('join-button');
          } else {
            button.text('Try again');
          }
        })
      });
    }

    $('#chatForm').submit(() =>{
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

    socket.on('load all messages', (data) => {
      data.forEach( message => {
        displayMessage(message);
      })
    });

    function displayMessage(message){
      $('#chat').prepend($('<li>').html(`<div class='message ${getCurrentUserClass(message.user)}'> ${message.content} </div>`));
    }

    function getCurrentUserClass(id) {
      let userId = $('#chat_user_id').val();
      if (userId === id) return "currentUser";
      else return "";
    }

  });

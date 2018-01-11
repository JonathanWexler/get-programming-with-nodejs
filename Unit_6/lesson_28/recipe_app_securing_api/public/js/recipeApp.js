'use strict';

$(document).ready(()=>{
  $("#modal-button").click(()=>{
    $(".modal-body").html('');
    $.get("/api/courses", (results) => {
      results['data']['courses'].forEach((course) => {
        $(".modal-body").append(`<div>
          <span>${course.title}</span>
          <div>${course.description}</div>
          <button class="join-button btn btn-info btn-sm" data-id="${course._id}">Join</button>
          </div>`);
          addJoinButtonListener();
        });
      })
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
  });

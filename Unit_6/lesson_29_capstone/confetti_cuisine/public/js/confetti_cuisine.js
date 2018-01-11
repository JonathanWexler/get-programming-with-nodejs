'use strict';

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
        console.log("count")
        let button = $(e.target),
        courseId = button.data('id');
        $.get(`/api/courses/${courseId}/join`, (data) => {
          if (data.success) {
            button.text('Joined');
            button.css({'backgroundColor': 'green'});
            button.removeClass('join-button');
          } else {
            console.log(data);
            button.text('Try again');
          }
        })
      });
    }
  });

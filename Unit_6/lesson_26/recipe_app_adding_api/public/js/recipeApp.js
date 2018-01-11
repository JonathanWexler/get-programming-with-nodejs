'use strict';

$(document).ready(()=>{
  $("#modal-button").click(()=>{
    $(".modal-body").html('');
    $.get("/courses?format=json", (data) => {
      data.forEach((course) => {
        console.log(course.title)
        $(".modal-body").append(`<div>
            <span>${course.title}</span>
            <div>${course.description}</div>
          </div>`);
      });
    })
  });
});

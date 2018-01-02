$(document).ready(()=>{
  $("#modal-button").click(()=>{
    $(".modal-body").html('');
    $.get("/courses?format=json", (data) => {
      data.forEach((course) => {
        $(".modal-body").append(`<div class='course-item'>
            <span>${course.name}</span>
            <div>${course.description}</div>
          </div>`);
      });
    })
  });
});

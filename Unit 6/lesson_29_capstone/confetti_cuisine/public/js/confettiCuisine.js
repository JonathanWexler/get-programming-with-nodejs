$(document).ready(()=>{
  $("#modal-button").click(()=>{
    $(".modal-body").html('');
    $.get("/courses?format=json", (data) => {
      data.forEach((course) => {
        $(".modal-body").append(`<div class='course-item'>
            <span>${course.name}</span>
            <span>$${course.cost}</span>
            <div>${course.description}</div>
            <a href="/course/${course._id}/enroll">
            <button class="btn btn-info btn-sm" >Enroll</button>
            </a>
          </div>`);
      });
    })
  });
});

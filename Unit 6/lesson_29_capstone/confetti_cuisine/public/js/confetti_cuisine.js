$(document).ready(()=>{
  $("#modal-button").click(()=>{
    $(".modal-body").html('');
    $.get("/courses?format=json", (data) => {
      JSON.parse(data).forEach((course) => {
        console.log(course)
        $(".modal-body").append(`<a href=/courses/${course._id}>
          <div class='course-item'>
            <span>${course.name}</span>
            <span>$${course.cost}</span>
            <div>${course.description}</div>
          </div>
        </a>`);
      });
    })
  });
});

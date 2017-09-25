$(document).ready(()=>{
  $("#modal-button").click(()=>{
    $(".modal-body").html('');
    $.get("/api/courses", (data) => {
      data.forEach((course) => {
        $(".modal-body").append(`<div class='course-item'>
        <span>${course.name}</span>
        <div>${course.description}</div>
        <button class="join-button btn btn-info btn-sm" data-id="${course._id}">Join</button>
        </div>`);
      });
      addJoinButtonListener() ;
    });
  });

  function addJoinButtonListener() {
    $(".join-button").click((e)=>{
      var button = $(e.target);
      var groupId = button.data('id');
      $.get(`/api/courses/${groupId}/join`, (data) => {
        if (data.success) {
          button.text('Joined');
          button.css({'backgroundColor': 'green'})
          button.removeClass('join-button')
        } else {
          button.text('Try again')
        }
      })
    });
  }

});

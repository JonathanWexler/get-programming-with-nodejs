$(document).ready(() => {
  const socket = io();
  $("#chatForm").submit(() => {
    let text = $("#chat-input").val(),
      userName = $("#chat-user-name").val(),
      userId = $("#chat-user-id").val();
    socket.emit("message", {
      content: text,
      userName: userName,
      userId: userId
    });
    $("#chat-input").val("");
    return false;
  });

  socket.on("message", message => {
    displayMessage(message);
  });

  socket.on("load all messages", data => {
    data.forEach(message => {
      displayMessage(message);
    });
  });

  socket.on("message", message => {
    displayMessage(message);
    for (let i = 0; i < 2; i++) {
      $(".chat-icon")
        .fadeOut(200)
        .fadeIn(200);
    }
  });

  let displayMessage = message => {
    $("#chat").prepend(
      $("<li>").html(`
				<div class='message ${getCurrentUserClass(message.user)}'>
				<span class="user-name">
					${message.userName}:
				</span>
					${message.content}
				</div>
			`)
    );
  };

  let getCurrentUserClass = id => {
    let userId = $("#chat-user-id").val();
    if (userId === id) return "current-user";
    else return "";
  };

  $("#modal-button").click(() => {
    $(".modal-body").html("");
    $.get(`/api/courses`, (results = {}) => {
      let data = results.data;
      if (!data || !data.courses) return;
      data.courses.forEach(course => {
        $(".modal-body").append(
          `<div>
						<span class="course-title">
							${course.title}
						</span>
						<span class="course-cost">$${course.cost}</span>
						<button class="${course.joined ? "joined-button" : "join-button"} btn btn-info btn-sm" data-id="${
            course._id
          }">
							${course.joined ? "Joined" : "Join"}
						</button>
						<div class="course-description">
							${course.description}
						</div>
					</div>`
        );
      });
    }).then(() => {
      addJoinButtonListener();
    });
  });
});

let addJoinButtonListener = () => {
  $(".join-button").click(event => {
    let $button = $(event.target),
      courseId = $button.data("id");
    console.log(`/api/courses/${courseId}/join`);
    $.get(`/api/courses/${courseId}/join`, (results = {}) => {
      let data = results.data;
      if (data && data.success) {
        $button
          .text("Joined")
          .addClass("joined-button")
          .removeClass("join-button");
      } else {
        $button.text("Try again");
      }
    });
  });
};

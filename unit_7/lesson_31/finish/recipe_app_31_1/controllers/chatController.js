"use strict";

module.exports = io => {
  io.on("connection", client => {
    console.log("new connection");
    client.on("disconnect", () => {
      console.log("user disconnected");
    });
    client.on("message", data => {
      let messageAttributes = {
        content: data.content,
        userName: data.userName,
        user: data.userId
      };
      io.emit("message", messageAttributes);
    });
  });
};

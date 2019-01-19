"use strict";

const mongoose = require("mongoose"),
  Course = require("./models/course");
mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/confetti_cuisine",
  { useNewUrlParser: true, useFindAndModify: false }
);

Course.deleteMany({}).then(() => {
    return Course.create({
      title: "Chocolate World",
      description: "Dive into the divine world of sweet and bitter chocolate making.",
      cost: 22,
      maxStudents: 14
    });
  }).then(course => console.log(course.title)).then(() => {
    return Course.create({
      title: "Pasta Boat",
      description: "Swim through original recipes and paddle your way through linguine",
      cost: 43,
      maxStudents: 8
    });
  }).then(course => console.log(course.title)).then(() => {
    return Course.create({
      title: "Hot Potato",
      description:
        "Potatoes are back and they are hot! Learn 7 different ways you can make potatoes relevant again.",
      cost: 12,
      maxStudents: 28
    });
  }).then(course => console.log(course.title)).catch(error => console.log(error.message)).then(() => {
    console.log("DONE");
    mongoose.connection.close();
  });

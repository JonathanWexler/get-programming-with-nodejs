"use strict";

const mongoose = require("mongoose"),
  Subscriber = require("./models/subscriber"),
  User = require("./models/user"),
  Course = require("./models/course");

mongoose.connect("mongodb://localhost/recipe_db");
mongoose.connection;

// USERS
var users = [
  {
    name: {
      first: "Jon",
      last: "Wexler"
    },
    email: "jon@jonwexler.com",
    zipCode: 10016,
    password: "12345"
  },
  {
    name: {
      first: "Chef",
      last: "Eggplant"
    },
    email: "eggplant@recipeapp.com",
    zipCode: 20331,
    password: "12345"
  },
  {
    name: {
      first: "Professor",
      last: "Souffle"
    },
    email: "souffle@recipeapp.com",
    zipCode: 19103,
    password: "12345"
  }
];

let createSubscriber = (c, resolve) => {
  Subscriber.create({
    name: `${c.name.first} ${c.name.last}`,
    email: c.email,
    zipCode: c.zipCode
  }).then(sub => {
    console.log(`CREATED SUBSCRIBER: ${sub.name}`);
    resolve(sub);
  });
};

users.reduce(
  (promiseChain, next) => {
    return promiseChain.then(
      () =>
        new Promise(resolve => {
          createSubscriber(next, resolve);
        })
    );
  },
  Subscriber.remove({})
    .exec()
    .then(() => {
      console.log("Subscriber data is empty!");
    })
);

let registerUser = (u, resolve) => {
  User.register(
    {
      name: {
        first: u.name.first,
        last: u.name.last
      },
      email: u.email,
      zipCode: u.zipCode,
      password: u.password
    },
    u.password,
    (error, user) => {
      console.log(`USER created: ${user.fullName}`);
      resolve(user);
    }
  );
};

users
  .reduce(
    (promiseChain, next) => {
      return promiseChain.then(
        () =>
          new Promise(resolve => {
            registerUser(next, resolve);
          })
      );
    },
    User.remove({})
      .exec()
      .then(() => {
        console.log("User data is empty!");
      })
  )
  .then(r => {
    console.log(JSON.stringify(r));
    mongoose.connection.close();
  })
  .catch(error => {
    console.log(`ERROR: ${error}`);
  });

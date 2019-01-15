"use strict";

module.exports = {
  getSubscriptionPage: (req, res) => {
    res.render("contact");
  },
  index: (req, res) => {
    res.render("index");
  },
  logRequestPaths: (req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
  }
};

"use strict";

const router = require("express").Router(),
  homeController = require("../controllers/homeController");

router.get("/chat", homeController.chat);
router.get("/", homeController.index);

module.exports = router;

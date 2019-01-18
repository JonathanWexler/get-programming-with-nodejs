"use strict";

const router = require("express").Router(),
  homeController = require("../controllers/homeController");

router.get("/", homeController.index);
router.get("/contact", homeController.contact);

module.exports = router;

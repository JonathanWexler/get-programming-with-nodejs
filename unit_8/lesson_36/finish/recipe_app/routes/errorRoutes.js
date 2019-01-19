"use strict";

const router = require("express").Router(),
  errorController = require("../controllers/errorController");

router.use(errorController.logErrors);
router.use(errorController.respondNoResourceFound);
router.use(errorController.respondInternalError);

module.exports = router;

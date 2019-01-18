"use strict";

const router = require("express").Router(),
  subscribersController = require("../controllers/subscribersController");

router.get("/", subscribersController.index, subscribersController.indexView);
router.get("/new", subscribersController.new);
router.post("/create", subscribersController.create, subscribersController.redirectView);
router.get("/:id/edit", subscribersController.edit);
router.put("/:id/update", subscribersController.update, subscribersController.redirectView);
router.get("/:id", subscribersController.show, subscribersController.showView);
router.delete("/:id/delete", subscribersController.delete, subscribersController.redirectView);

module.exports = router;

const express = require("express");
const router = express.Router();
const processItemService = require("../services/processItemService");


router.post("/create", processItemService.create);
router.patch("/:id", processItemService.update);
router.get("/", processItemService.getAll);
router.get("/:id", processItemService.getSingle);

module.exports = router;
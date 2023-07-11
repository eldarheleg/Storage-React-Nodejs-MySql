const express = require("express");
const router = express.Router();
const processService = require("../services/processService");


router.post("/create", processService.create);
router.patch("/:id", processService.update);
router.get("/", processService.getAll);
router.get("/:id", processService.getSingle);

module.exports = router;
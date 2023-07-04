const express = require("express");
const router = express.Router();
const processService = require("../services/processService");


router.post("/", processService.createProcess);
router.patch("/:id", processService.updateProcess);
router.get("/", processService.getAllProcesses);
router.get("/:id", processService.getSingleProcess);

module.exports = router;
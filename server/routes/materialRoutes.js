const express = require("express");
const router = express.Router();
const materialService = require("../services/materialService");


router.post("/create", materialService.create);
router.patch("/update/:id", materialService.update);
router.get("/", materialService.getAll);
router.get("/:id", materialService.getSingle);

module.exports = router;
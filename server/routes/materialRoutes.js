const express = require("express");
const router = express.Router();
const materialService = require("../services/materialService");


router.post("/create", materialService.createMaterial);
router.patch("/update/:id", materialService.updateMaterial);
router.get("/", materialService.getAllMaterials);
router.get("/:id", materialService.getSingleMaterial);

module.exports = router;
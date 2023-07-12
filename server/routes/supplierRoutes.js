const express = require("express");
const router = express.Router();
const supplierService = require("../services/supplierService");


router.post("/create", supplierService.create);
router.patch("/update/:id", supplierService.update);
router.get("/", supplierService.getAll);
router.get("/:id", supplierService.getSingle);

module.exports = router;
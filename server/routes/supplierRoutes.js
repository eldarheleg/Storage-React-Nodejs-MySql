const express = require("express");
const router = express.Router();
const supplierService = require("../services/supplierService");


router.post("/create", supplierService.createSupplier);
router.patch("/update/:id", supplierService.updateSupplier);
router.get("/", supplierService.getAllSuppliers);
router.get("/:id", supplierService.getSingleSupplier);

module.exports = router;
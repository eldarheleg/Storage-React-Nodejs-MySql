const express = require("express");
const router = express.Router();
const productService = require("../services/productService");


router.post("/create", productService.create);
router.patch("/:id", productService.update);
router.get("/", productService.getAll);
router.get("/:id", productService.getSingle);

module.exports = router;
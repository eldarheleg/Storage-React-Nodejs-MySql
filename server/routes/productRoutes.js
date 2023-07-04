const express = require("express");
const router = express.Router();
const productService = require("../services/productService");


router.post("/", productService.createProduct);
router.patch("/:id", productService.updateProduct);
router.get("/", productService.getAllProducts);
router.get("/:id", productService.getSingleProduct);

module.exports = router;
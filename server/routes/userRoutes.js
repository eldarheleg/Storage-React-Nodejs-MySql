const auth = require("../middleware/authMiddleware");
const userService = require("../services/userService");
const express = require("express");
const router = express.Router();

router.post("/register", userService.signup);
router.post("/login", userService.signin);
router.get("/employees", auth.isAdmin, userService.getAll);
router.get("/employees/:id", auth.isAdmin, userService.getOne);

module.exports = router;

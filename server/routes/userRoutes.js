const auth = require("../middleware/authMiddleware");
const userService = require('../services/userService')
const express = require("express");
const router = express.Router();

router.post("/register", userService.signup)
router.post("/login", userService.signin)

module.exports = router

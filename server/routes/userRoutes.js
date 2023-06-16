const auth = require("../middleware/Auth");
const userService = require('../services/userService')
const express = require("express");
const router = express.Router();

router.post("/register", auth.isAdmin, userService.signup)
router.post("/login", userService.signin)

module.exports = router
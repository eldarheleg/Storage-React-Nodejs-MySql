const auth = require("../middleware/authMiddleware");
const userService = require("../services/userService");
const express = require("express");
const router = express.Router();

router.post("/register", auth.isAdmin, userService.signup);
router.post("/register/admin", userService.signup);
router.post("/login", userService.login);
router.post("/logout", auth.tokenAuth, userService.logout);
router.patch("/password-recovery/:username", auth.tokenAuth, userService.changePassword);
router.get("/employees", auth.isAdmin, userService.getAll);
router.get("/employees/:username", auth.isAdmin, userService.getOne);

module.exports = router;

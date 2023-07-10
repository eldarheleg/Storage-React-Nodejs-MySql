const auth = require("../middleware/authMiddleware");
const userService = require("../services/userService");
const express = require("express");
const router = express.Router();

router.post("/register", auth.isAdmin, userService.signup);
router.post("/register/admin", userService.signup);
router.post("/login", userService.login);
router.get("/logout", auth.tokenAuth, userService.logout);
router.patch("/changepass/:id", auth.tokenAuth, userService.updatePassword);
router.get("/employees", auth.isAdmin, userService.getAll);
router.get("/employees/:id", auth.tokenAuth, userService.getOne);

module.exports = router;

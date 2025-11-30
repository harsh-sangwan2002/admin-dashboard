const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/register", authController.register)
    .post("/login", authController.login)
    .post("/refresh", authController.refreshToken)
    .post("/logout", authController.logout)

module.exports = router;

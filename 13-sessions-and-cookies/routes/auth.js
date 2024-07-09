const express = require("express");

const authController = require("../controllers/auth");

const router = express.Router();

// GET => /login
router.get("/login", authController.getLogin);

// POST => /login
router.post("/login", authController.postLogin);

// POST => /logout
router.post("/logout", authController.postLogout);

module.exports = router;

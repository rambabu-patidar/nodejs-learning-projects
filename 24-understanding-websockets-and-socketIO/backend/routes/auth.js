const express = require("express");

const authController = require("../controllers/auth");
const authValidator = require("../validators/auth");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.put("/signup", authValidator.putSignup, authController.putSignup);

router.post("/login", authValidator.postLogin, authController.postLogin);

// GET /auth/status
router.get("/status", isAuth, authController.getUserStatus);

// PUT /auth/status
router.put(
	"/status",
	isAuth,
	authValidator.putUserStatus,
	authController.putUserStatus
);

module.exports = router;

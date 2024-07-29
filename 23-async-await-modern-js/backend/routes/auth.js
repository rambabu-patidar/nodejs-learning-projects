const express = require("express");

const authController = require("../controllers/auth");
const authValidator = require("../validators/auth");

const router = express.Router();

router.put("/signup", authValidator.putSignup, authController.putSignup);

router.post("/login", authValidator.postLogin, authController.postLogin);

module.exports = router;

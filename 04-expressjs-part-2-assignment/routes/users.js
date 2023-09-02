const express = require("express");
const path = require("path");

const rootDir = require("../util/path");

const router = express.Router();

router.post("/users", (req, res, next) => {
	console.log(req.body);
	res.redirect("/");
});

router.get("/add-user", (req, res, next) => {
	res.sendFile(path.join(rootDir, "view", "add-user.html"));
});

router.get("/users", (req, res, next) => {
	res.sendFile(path.join(rootDir, "view", "users.html"));
});

module.exports = router;

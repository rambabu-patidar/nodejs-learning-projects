const { renderFile } = require("ejs");
const express = require("express");

const router = express.Router();

const usersData = [];

// "/" => GET
router.get("/", (req, res, next) => {
	res.render("home", { pageTitle: "Home Page", path: "/" });
});

// "/" => POST
router.post("/", (req, res, next) => {
	usersData.push({ name: req.body.name });
	console.log(usersData);
	res.redirect("/users");
});

exports.routes = router;
exports.usersData = usersData;

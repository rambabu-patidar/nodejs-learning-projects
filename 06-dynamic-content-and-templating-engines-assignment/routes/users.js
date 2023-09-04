const express = require("express");

const homeData = require("./home");

const router = express.Router();

// "/users" => GET
router.get("/users", (req, res, next) => {
	console.log(homeData.usersData);
	const usersData = homeData.usersData;
	res.render("users", {
		pageTitle: "Users List Page",
		users: usersData,
		path: "/users",
	});
});

module.exports = router;

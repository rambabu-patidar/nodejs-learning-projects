const express = require("express");
const path = require("path");

const rootDir = require("../util/path");

const router = express.Router();

// instead of using "../" to go one level up we can just use ".." and it will be fine;
router.get("/", (req, res, next) => {
	res.sendFile(path.join(rootDir, "views", "shop.html"));
});

module.exports = router;

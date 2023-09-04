const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

const adminData = require("./admin");

router.get("/", (req, res, next) => {
	const products = adminData.products;
	res.render("shop", {
		docTitle: "Shop",
		prods: products,
		path: "/",
		productsLength: products.length > 0,
		productCSS: true,
		activeShop: true,
	});
});

module.exports = router;

const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
	Product.fetchAll()
		.then(([rows, fieldData]) => {
			res.render("shop/product-list", {
				prods: rows,
				pageTitle: "All Products",
				path: "/products",
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getProduct = (req, res, next) => {
	const productId = req.params.productId;
	Product.fetchSingle(productId)
		.then(([row, fieldData]) => {
			res.render("shop/product-detail", {
				product: row[0],
				pageTitle: row[0].title,
				path: "/products",
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getIndex = (req, res, next) => {
	Product.fetchAll()
		.then(([rows, fieldData]) => {
			res.render("shop/index", {
				prods: rows,
				pageTitle: "Shop",
				path: "/",
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getCart = (req, res, next) => {
	Cart.getCart()
		.then(([rows, fieldData]) => {
			const totalPrice = rows
				.reduce((acc, currValue) => acc + currValue.productPriceSum, 0)
				.toFixed(2);
			res.render("shop/cart", {
				path: "/cart",
				pageTitle: "Your Cart",
				products: rows,
				totalPrice: totalPrice,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postCart = (req, res, next) => {
	const productId = req.body.productId;
	Cart.addProduct(productId)
		.then(() => {
			res.redirect("/cart");
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postCartDeleteItem = (req, res, next) => {
	const productId = req.body.productId;
	Cart.delete(productId)
		.then(() => {
			res.redirect("/cart");
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getOrders = (req, res, next) => {
	res.render("shop/orders", {
		path: "/orders",
		pageTitle: "Your Orders",
	});
};

exports.getCheckout = (req, res, next) => {
	res.render("shop/checkout", {
		path: "/checkout",
		pageTitle: "Checkout",
	});
};

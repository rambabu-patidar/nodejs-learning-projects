const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
	Product.fetchAll((products) => {
		res.render("shop/product-list", {
			prods: products,
			pageTitle: "All Products",
			path: "/products",
		});
	});
};

exports.getProduct = (req, res, next) => {
	const productId = req.params.productId;
	Product.fetchSingle(productId, (product) => {
		res.render("shop/product-detail", {
			product: product,
			pageTitle: product.title,
			path: "/products",
		});
	});
};

exports.getIndex = (req, res, next) => {
	Product.fetchAll((products) => {
		res.render("shop/index", {
			prods: products,
			pageTitle: "Shop",
			path: "/",
		});
	});
};

exports.getCart = (req, res, next) => {
	Cart.getCart((cart) => {
		Product.fetchAll((products) => {
			let cartProducts = [];
			for (let product of products) {
				const cartProduct = cart.products.find((p) => p.id === product.id);
				if (cartProduct) {
					cartProducts.push({ product: product, qty: cartProduct.qty });
				}
			}

			res.render("shop/cart", {
				path: "/cart",
				pageTitle: "Your Cart",
				products: cartProducts,
				totalPrice: cart.totalPrice,
			});
		});
	});
};

exports.postCart = (req, res, next) => {
	const productId = req.body.productId;
	Product.fetchSingle(productId, (product) => {
		Cart.addProduct(productId, product.price);
	});
	res.redirect("/cart");
};

exports.postCartDeleteItem = (req, res, next) => {
	const productId = req.body.productId;
	Product.fetchSingle(productId, (product) => {
		Cart.delete(productId, product.price);
		res.redirect("/cart");
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

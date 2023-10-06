const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
	Product.findAll()
		.then((products) => {
			res.render("shop/index", {
				prods: products,
				pageTitle: "Shop",
				path: "/",
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getProduct = (req, res, next) => {
	const prodId = req.params.productId;

	// this Return the array of items acc to filter
	Product.findAll({ where: { id: prodId } })
		.then((products) => {
			res.render("shop/product-detail", {
				product: products[0],
				pageTitle: products[0].title,
				path: "/products",
			});
		})
		.catch((err) => {
			console.log(err);
		});

	// This return a single product item
	// Product.findByPk(prodId)
	// 	.then((product) => {
	// 		res.render("shop/product-detail", {
	// 			product: product,
	// 			pageTitle: product.title,
	// 			path: "/products",
	// 		});
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 	});
};

// get the index page data
exports.getIndex = (req, res, next) => {
	Product.findAll()
		.then((products) => {
			res.render("shop/index", {
				prods: products,
				pageTitle: "Shop",
				path: "/",
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

// this uses magic methods
exports.getCart = (req, res, next) => {
	req.user
		.getCart()
		.then((cart) => {
			return cart.getProducts();
		})
		.then((cartProducts) => {
			res.render("shop/cart", {
				path: "/cart",
				pageTitle: "Your Cart",
				products: cartProducts,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

// this also uses magic methods
exports.postCart = (req, res, next) => {
	const prodId = req.body.productId;

	let fetchedCart;
	let newQuantity = 1;

	req.user
		.getCart()
		.then((cart) => {
			fetchedCart = cart;
			return cart.getProducts({ where: { id: prodId } });
		})
		.then((products) => {
			let product;
			if (products.length > 0) {
				product = products[0];
			}
			// product exits so only updates the cart
			if (product) {
				const oldQuantity = product.cartItem.quantity;
				newQuantity = 1 + oldQuantity;
				return product; // automatically will be wrapped by promise.
			}
			// product not exist so create a new and add it in cart.
			return Product.findByPk(prodId);
		})
		.then((product) => {
			return fetchedCart.addProduct(product, {
				through: { quantity: newQuantity },
			});
		})
		.then(() => {
			res.redirect("/cart");
		})
		.catch((err) => {
			console.log(err);
		});
};

// This also uses magic methods
// In brief whenever we do some associations we get magic methods.
exports.postCartDeleteProduct = (req, res, next) => {
	const prodId = req.body.productId;
	Product.findById(prodId, (product) => {
		Cart.deleteProduct(prodId, product.price);
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

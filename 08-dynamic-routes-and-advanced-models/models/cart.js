const fs = require("fs");
const path = require("path");

const rootDir = require("../util/path");

const p = path.join(rootDir, "data", "cart.json");

const getProductsFromFile = (cb) => {
	fs.readFile(p, (err, fileContent) => {
		let cart = { products: [], totalPrice: 0 };
		if (!err) {
			cart = JSON.parse(fileContent);
		}
		cb(cart);
	});
};

module.exports = class Cart {
	static addProduct(id, productPrice) {
		// Fetch the existing product
		getProductsFromFile((cart) => {
			// if the product with given id already exists
			const existingProductIndex = cart.products.findIndex((p) => p.id === id);
			const existingProduct = cart.products[existingProductIndex];

			let updatedProduct;
			if (existingProduct) {
				updatedProduct = { ...existingProduct };
				updatedProduct.qty = updatedProduct.qty + 1;
				cart.products = [...cart.products];
				cart.products[existingProductIndex] = updatedProduct;
			} else {
				updatedProduct = { id: id, qty: 1 };
				cart.products = [...cart.products, updatedProduct];
			}
			cart.totalPrice += +productPrice;
			fs.writeFile(p, JSON.stringify(cart), (err) => {
				console.log(err);
			});
		});
	}

	static getCart(cb) {
		getProductsFromFile((cart) => {
			cb(cart);
		});
	}

	static delete(id, productPrice) {
		getProductsFromFile((cart) => {
			const productIndex = cart.products.findIndex((p) => p.id === id);
			const product = cart.products[productIndex];

			let updatedCart;
			if (product) {
				updatedCart = {
					products: cart.products.filter((p) => p.id !== id),
					totalPrice: cart.totalPrice - product.qty * productPrice,
				};
				fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
					console.log(err);
				});
			} else {
				// error handling because the product you want to delete doesn;t exist
				console.log("Product you want to delete doesn't exist");
				return;
			}
		});
	}
};

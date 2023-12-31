const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
	res.render("admin/edit-product", {
		pageTitle: "Add Product",
		path: "/admin/add-product",
		editing: false,
	});
};

exports.postAddProduct = (req, res, next) => {
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const price = req.body.price;
	const description = req.body.description;
	const product = new Product(null, title, imageUrl, description, price);
	product.save();
	res.redirect("/");
};

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit;
	const productId = req.params.productId;

	if (!editMode) {
		return res.redirect("/");
	}
	Product.fetchSingle(productId, (product) => {
		// if the user modifies URL and put random id
		if (!product) {
			return redirect("/");
		}
		res.render("admin/edit-product", {
			pageTitle: "Edit Product",
			path: "/admin/edit-product",
			editing: editMode,
			product: product,
		});
	});
};

exports.postEditProduct = (req, res, next) => {
	const updatedId = req.body.productId;
	const updatedTitle = req.body.title;
	const updatedImageUrl = req.body.imageUrl;
	const updatedPrice = req.body.price;
	const updatedDescription = req.body.description;
	const updatedProduct = new Product(
		updatedId,
		updatedTitle,
		updatedImageUrl,
		updatedDescription,
		updatedPrice
	);
	updatedProduct.save();
	res.redirect("/admin/products");
};

exports.getProducts = (req, res, next) => {
	Product.fetchAll((products) => {
		res.render("admin/products", {
			prods: products,
			pageTitle: "Admin Products",
			path: "/admin/products",
		});
	});
};

exports.postDeleteProduct = (req, res, next) => {
	const productId = req.body.productId;
	Product.delete(productId);
	res.redirect("/admin/products");
};

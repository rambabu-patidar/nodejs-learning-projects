const Product = require("../models/product");

const { ObjectId } = require("mongodb");

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
	const product = new Product(
		title,
		price,
		imageUrl,
		description,
		null,
		req.user._id
	);
	product
		.save()
		.then((result) => {
			// console.log(result);
			console.log("Created Product");
			res.redirect("/admin/products");
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) {
		return res.redirect("/");
	}
	const prodId = req.params.productId;

	Product.findById(prodId)
		.then((product) => {
			if (!product) {
				return res.redirect("/");
			}
			res.render("admin/edit-product", {
				pageTitle: "Edit Product",
				path: "/admin/edit-product",
				editing: editMode,
				product: product,
			});
		})
		.catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
	const prodId = req.body.productId;
	const updatedTitle = req.body.title;
	const updatedPrice = req.body.price;
	const updatedImageUrl = req.body.imageUrl;
	const updatedDesc = req.body.description;
	const updatedProduct = new Product(
		updatedTitle,
		updatedPrice,
		updatedImageUrl,
		updatedDesc,
		prodId
	);
	/* 
	in the updatedProduct object above when updateding we are passing prodId so make sure that 
	you pass id in the using new ObjectId(prodId) form because if you will not do thie and assign  updatedProduct 
	in updateOne()'s $set object then it will try to reassign the id which is not good and will throw error.
	
	and if you don't want to do this convertion then extract each field except prodId to provide in $set object.
	
	OR you could just use the ObjectId() function in your model definition so whenever we create a object the Id field remain always valid.
	*/

	updatedProduct
		.save()
		.then(() => {
			console.log("UPDATED PRODUCT!");
			res.redirect("/admin/products");
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getProducts = (req, res, next) => {
	Product.fetchAll()
		.then((products) => {
			res.render("admin/products", {
				prods: products,
				pageTitle: "Admin Products",
				path: "/admin/products",
			});
		})
		.catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
	const prodId = req.body.productId;
	Product.deleteById(prodId)
		.then(() => {
			console.log("DESTROYED PRODUCT");
			res.redirect("/admin/products");
		})
		.catch((err) => console.log(err));
};

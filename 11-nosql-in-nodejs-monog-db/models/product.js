const mongodb = require("mongodb");
const { getDb } = require("../util/database");

class Product {
	constructor(title, price, imageUrl, description, id, userId) {
		this.title = title;
		this.price = price;
		this.imageUrl = imageUrl;
		this.description = description;
		this._id = id ? new mongodb.ObjectId(id) : null;
		this.userId = userId;
	}

	save() {
		const db = getDb();
		let dbOperation;
		if (this._id) {
			// filter by this property
			const filter = { _id: this._id };
			// update the matched filter.
			const updateDoc = { $set: this };
			dbOperation = db.collection("products").updateOne(filter, updateDoc);
		} else {
			dbOperation = db.collection("products").insertOne(this);
		}

		return dbOperation
			.then((result) => {
				// console.log(result);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	// update(prodId) {
	// 	const db = getDb();
	// 	return db
	// 		.collection("products")
	// 		.updateOne({ _id: new mongodb.ObjectId(prodId) }, { $set: this })
	// 		.then((product) => {
	// 			console.log(product);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// }

	static fetchAll() {
		const db = getDb();
		return db
			.collection("products")
			.find()
			.toArray()
			.then((products) => {
				// console.log(products);
				return products;
			})
			.catch((err) => {
				console.log(err);
			});
	}

	static findById(prodId) {
		const db = getDb();
		return db
			.collection("products")
			.find({ _id: new mongodb.ObjectId(prodId) })
			.next()
			.then((product) => {
				// console.log(product);
				return product;
			})
			.catch((err) => {
				console.log(err);
			});
	}

	static deleteById(prodId) {
		const db = getDb();
		const filter = { _id: new mongodb.ObjectId(prodId) };
		return db
			.collection("products")
			.deleteOne(filter)
			.then((result) => {
				console.log(result);
			})
			.catch((err) => {
				console.log(err);
			});
	}
}

module.exports = Product;

const mongodb = require("mongodb");
const { getDb } = require("../util/database");

class User {
	constructor(name, email, cart, id) {
		this.name = name;
		this.email = email;
		this.cart = cart; // {items: [{product, qty}, ...]}
		this._id = id;
	}

	save() {
		const db = getDb();
		return db
			.collection("users")
			.insertOne(this)
			.then((user) => {
				console.log(user);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	addToCart(product) {
		const existingProductIndex = this.cart.items.findIndex((cartP) => {
			return cartP.productId.toString() === product._id.toString();
		});

		let updatedCartItems = [...this.cart.items];
		let newQuantity = 1;
		if (existingProductIndex >= 0) {
			newQuantity = this.cart.items[existingProductIndex].quantity + 1;
			updatedCartItems[existingProductIndex].quantity = newQuantity;
		} else {
			updatedCartItems.push({
				productId: new mongodb.ObjectId(product._id),
				quantity: newQuantity,
			});
		}
		const updatedCart = { items: updatedCartItems };

		const db = getDb();
		return db
			.collection("users")
			.updateOne(
				{ _id: new mongodb.ObjectId(this._id) },
				{ $set: { cart: updatedCart } }
			);
	}

	getCart() {
		const db = getDb();
		const productIds = this.cart.items.map((item) => {
			return item.productId;
		});

		return db
			.collection("products")
			.find({ _id: { $in: productIds } })
			.toArray()
			.then((products) => {
				return products.map((product) => {
					return {
						...product,
						quantity: this.cart.items.find((i) => {
							return i.productId.toString() === product._id.toString();
						}).quantity,
					};
				});
			});
	}

	addOrder() {
		const db = getDb();

		return this.getCart()
			.then((products) => {
				const orders = {
					items: products,
					user: {
						_id: new mongodb.ObjectId(this._id),
						name: this.name,
					},
				};
				return db.collection("orders").insertOne(orders);
			})
			.then((result) => {
				this.cart = { items: [] };
				return db
					.collection("users")
					.updateOne(
						{ _id: new mongodb.ObjectId(this._id) },
						{ $set: { cart: { items: [] } } }
					);
			});
	}

	getOrders() {
		const db = getDb();
		return db
			.collection("orders")
			.find({ "user._id": new mongodb.ObjectId(this._id) })
			.toArray();
	}

	deleteItemFromCart(productId) {
		const updatedCartItems = this.cart.items.filter(
			(item) => item.productId.toString() !== productId.toString()
		);

		const db = getDb();
		return db
			.collection("users")
			.updateOne(
				{ _id: new mongodb.ObjectId(this._id) },
				{ $set: { cart: { items: updatedCartItems } } }
			);
	}

	static findById(userId) {
		const db = getDb();
		return db
			.collection("users")
			.findOne({ _id: new mongodb.ObjectId(userId) })
			.then((user) => {
				// console.log(user);
				return user;
			})
			.catch((err) => {
				console.log(err);
			});
	}
}
module.exports = User;

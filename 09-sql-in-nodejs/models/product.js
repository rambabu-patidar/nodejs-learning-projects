const db = require("../util/database");

module.exports = class Product {
	constructor(id, title, imageUrl, description, price) {
		this.id = id;
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
	}

	save() {
		return db.execute(
			"INSERT INTO products (title, price, description, imageUrl) VALUES(?, ?, ?, ?)",
			[this.title, this.price, this.description, this.imageUrl]
		);
	}

	saveEdited() {
		return db.execute(
			"UPDATE products SET title = ?, price = ?, description = ?, imageUrl = ? WHERE id = ?",
			[this.title, this.price, this.description, this.imageUrl, this.id]
		);
	}
	static fetchAll() {
		return db.execute("SELECT * FROM products");
	}

	static fetchSingle(id) {
		return db.execute("SELECT * FROM products WHERE id = ?", [id]);
	}

	static delete(id) {
		return db.execute("DELETE FROM products WHERE id = ?", [id]);
	}
};

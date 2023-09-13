const db = require("../util/database");

module.exports = class Cart {
	static addProduct(id) {
		// Fetch the existing product

		return db.execute(
			"INSERT INTO cart (id, qty) VALUES (?, 1) ON DUPLICATE KEY UPDATE qty = qty + 1;",
			[id]
		);
	}

	static getCart() {
		return db.execute(
			"SELECT *, sum(products.price * cart.qty) as productPriceSum FROM products JOIN cart WHERE products.id = cart.id group by products.id;"
		);
	}

	static delete(id) {
		return db.execute("DELETE FROM cart where id = ?", [id]);
	}
};

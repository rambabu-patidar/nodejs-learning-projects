const { check, body } = require("express-validator");

exports.postAddOrEditProduct = [
	check("title")
		.trim()
		.isLength({ min: 1 })
		.withMessage("Invalid title field!"),
	body("imageUrl")
		.trim()
		.isLength({ min: 1 })
		.withMessage("Please provide a image URL!")
		.isURL()
		.withMessage("Invalid URL"),
	check("price")
		.custom((value, { req }) => {
			if (+value <= 0) {
				return false;
			}
			return true;
		})
		.withMessage("Price cann't be negative or empty!!")
		.isNumeric()
		.withMessage("Price can only be numeric"),
	body("description")
		.isLength({ min: 1 })
		.trim()
		.withMessage("Plese give some description!"),
];

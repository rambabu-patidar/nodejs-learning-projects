const { body } = require("express-validator");

const User = require("../models/user");

exports.putSignup = [
	body("email")
		.isEmail()
		.withMessage("Enter a valid email")
		.normalizeEmail()
		.custom((value, { req }) => {
			return User.findOne({ email: value }).then((fetchedUser) => {
				if (fetchedUser) {
					return Promise.reject("A user with this email already exists!");
				}
			});
		}),
	body(
		"password",
		"Password must not contain other than alphnumeric values and should be at least length of 5"
	)
		.trim()
		.isLength({ min: 5 })
		.isAlphanumeric(),

	body("name").trim().notEmpty().withMessage("User name must not be empty!"),
];

exports.postLogin = [
	body("email").isEmail().withMessage("Enter a valid Email!").normalizeEmail(),
	body("password")
		.trim()
		.notEmpty()
		.withMessage("Password should not be empty!"),
];

exports.putUserStatus = [
	body("status").trim().notEmpty().withMessage("User status can't be empty!"),
];

const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
	let message = req.flash("error");
	if (message.length > 0) {
		message = message[0];
	} else {
		message = null;
	}
	res.render("auth/login", {
		path: "/login",
		pageTitle: "Login",
		isAuthenticated: false,
		errorMessage: message,
	});
};

exports.getSignup = (req, res, next) => {
	let message = req.flash("error");
	if (message.length > 0) {
		message = message[0];
	} else {
		message = null;
	}
	res.render("auth/signup", {
		path: "/signup",
		pageTitle: "Signup",
		isAuthenticated: false,
		errorMessage: message,
	});
};

exports.postLogin = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;

	// find the user with certain mail
	// compare its password
	// create a session for him/her
	let fetchedUser;
	User.findOne({ email: email })
		.then((user) => {
			fetchedUser = user;
			if (!fetchedUser) {
				req.flash("error", "Invalid email or password");
				return res.redirect("/login");
			}

			bcrypt.compare(password, fetchedUser.password).then((doMatch) => {
				if (doMatch) {
					req.session.isLoggedIn = true;
					req.session.user = user;
					return req.session.save((err) => {
						if (err) {
							console.log(err);
						}
						req.flash("error", "Invalid email or password");
						res.redirect("/");
					});
				}
				res.redirect("/login");
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postSignup = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	const confirmPassword = req.body.confirmPassword;

	User.findOne({ email: email })
		.then((fetchedUser) => {
			if (fetchedUser) {
				req.flash("error", "User already exists");
				return res.redirect("/signup");
			}
			return bcrypt
				.hash(password, 12)
				.then((encryptedPassword) => {
					const user = new User({
						email: email,
						password: encryptedPassword,
						cart: { items: [] },
					});

					return user.save();
				})
				.then(() => {
					res.redirect("/login");
				});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postLogout = (req, res, next) => {
	req.session.destroy((err) => {
		if (err) {
			console.log(err);
		}
		res.redirect("/");
	});
};

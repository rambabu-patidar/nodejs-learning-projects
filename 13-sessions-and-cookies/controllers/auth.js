const User = require("../models/user");

exports.getLogin = (req, res, next) => {
	res.render("auth/login", {
		path: "/login",
		pageTitle: "Login",
		isAuthenticated: req.session.isLoggedIn,
	});
};

exports.postLogin = (req, res, next) => {
	// req.isLoggedIn = true;
	/* This doesn't work because the req object die after the one cycle, i.e. every request we
   sent(no matter if send by the same user or different)
  they are treated as different request hence the isLoggedIn property set on this req object will
  die after it finish this request*/

	// setting up an cookie

	// res.setHeader("Set-Cookie", "loggedIn:true");
	/* cookie works fine if we don't have sensative information as it gets stored in client side.
  but if we have sensative data client can manipulate that from their browser using dev tools
  and that is not good way. */

	// Hence we will use sessions
	// we created session using a middleware in app js file
	// now we can set fields to sessions
	// req.session.isLoggedIn = true;

	User.findById("66855726d613acb7e81fe3fe")
		.then((user) => {
			req.session.user = user;
			req.session.isLoggedIn = true;
			req.session.save((err) => {
				if (err) {
					console.log(err);
				}
				res.redirect("/");
			});
		})
		.catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
	req.session.destroy((err) => {
		if (err) {
			console.log(err);
		}
		res.redirect("/");
	});
};

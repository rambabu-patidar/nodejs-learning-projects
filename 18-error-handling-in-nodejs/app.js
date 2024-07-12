const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const flash = require("connect-flash");

const errorController = require("./controllers/error");
const User = require("./models/user");

const MONGODB_URI =
	"mongodb+srv://patidarrambabu135:<Password>@learningnodecluster01.q631tqm.mongodb.net/shop?retryWrites=true&w=majority&appName=LearningNodeCluster01";

const app = express();
const store = new MongoDBStore({
	uri: MONGODB_URI,
	collection: "sessions",
});

const csrfProtection = csrf();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
	session({
		secret: "my secret",
		resave: false,
		saveUninitialized: false,
		store: store,
	})
);

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
	res.locals.isAuthenticated = req.session.isLoggedIn;
	res.locals.csrfToken = req.csrfToken();
	next();
});

app.use((req, res, next) => {
	if (!req.session.user) {
		return next();
	}
	User.findById(req.session.user._id)
		.then((user) => {
			// throw new Error("Dummy");
			if (!user) {
				return next();
			}
			req.user = user;
			next();
		})
		.catch((err) => {
			return next(new Error(err));
		});
});

// https://expressjs.com/en/5x/api.html#res.locals

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get("/500", errorController.get500);

// NOTE: this page render doesn't mean technical error because there is no any
// 	error object gets thrown for this
// this just reached when all other routes exhausted hence we didn't found the fitting route
// hence a 404 page not found error.
app.use(errorController.get404);

// in case of this we have a technical error thrown somewhere above and called next(err) on it
// that's why it will be reached and executed.

// also be careful to go into infinite loop as you get an error and then you redirect and then again get error

// if you throw error in synchronous code then express will make it to the 4 parameter handler MW
// but if you throw error in asynchronous code then express will not make it to that MW and our application will break
// that means you must call next(error) in async code to make it to error handling MW.
// btw we can call next(error) in synchronous code also and it will work fine.

app.use((error, req, res, next) => {
	// res.status(error.httpStatusCode).render(...)
	console.log(error.customMsg);
	// res.redirect("/500");

	res.status(500).render("500", {
		pageTitle: "Error!",
		path: "/500",
	});
});

// if you have more then one 4 parameter handler MW then they are called one by one from
// top to bottom as usual normal MW does.

// setting up and sending status codes with responses doen't mean that our application will crashes or perform
// something new, they just are the indicator that for the request you send this is what happend
// and makes client aware of that operation.

mongoose
	.connect(MONGODB_URI)
	.then((result) => {
		console.log("Connected");
		app.listen(3000);
	})
	.catch((err) => {
		console.log(err);
	});

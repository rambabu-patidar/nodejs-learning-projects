const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const errorController = require("./controllers/error");
const User = require("./models/user");

const MONGO_DB_URI =
	"mongodb+srv://patidarrambabu135:<Password>@learningnodecluster01.q631tqm.mongodb.net/shop?retryWrites=true&w=majority&appName=LearningNodeCluster01";

const app = express();
const store = new MongoDBStore({
	uri: MONGO_DB_URI,
	collection: "sessions",
});

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Initializing a session
app.use(
	session({
		secret: "my secret",
		resave: false,
		saveUninitialized: false,
		store: store,
	})
);

app.use((req, res, next) => {
	// we want to have brand new mongoose user object(filled with good functionality)
	// available in our application for every request hence we find it fueled with session
	// because session will make sure that if the same user is making requests.
	if (!req.session.user) {
		return next();
	}
	User.findById(req.session.user._id)
		.then((user) => {
			req.user = user;
			next();
		})
		.catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
	.connect(MONGO_DB_URI)
	.then((result) => {
		console.log("connected");
		User.findOne().then((user) => {
			if (!user) {
				const user = new User({
					name: "Rambabu Patidar",
					email: "rambabu@test.com",
					cart: {
						items: [],
					},
				});
				user.save();
			}
		});
		app.listen(3000);
	})
	.catch((err) => {
		console.log(err);
	});

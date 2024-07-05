const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const mongoose = require("mongoose");

const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
	User.findById("66855726d613acb7e81fe3fe")
		.then((user) => {
			req.user = user;
			next();
		})
		.catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
	.connect(
		"mongodb+srv://patidarrambabu135:<PASSWORD>@learningnodecluster01.q631tqm.mongodb.net/shop?retryWrites=true&w=majority&appName=LearningNodeCluster01"
	)
	.then(() => {
		console.log("Connected");
		return User.findOne();
	})
	.then((user) => {
		if (!user) {
			const user = new User({
				name: "Rambabu Patidar",
				email: "rambabu@test.com",
				cart: { items: [] },
			});
			return user.save();
		}
		return "user Already Exists";
	})
	.then((result) => {
		app.listen(3000);
	})
	.catch((err) => {
		console.log(err);
	});

const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// now we want to access the created user in the app.
// here it is dummy that we created below but we need it anyway in whole app
// so we will register the middleware for that
// here you may say that we are accessing User before we are creating them
// but the fact is that the middleware functions doesn't run util request are not made from browser.
// so when the code run for starting of app.js the callbacks of middleware are only registered and code for creating user will run
// hence it is guarentte that the user will exist when we are trying to fetch here in our middleware.

// you can also see that we setted a user property on req object of MW and this is fine so that we can use that in other part of application
// just remember that you don't override the default key values in that request object.
// the next() will ensure that this will run for every request and after that request will be funneled to its specific MW.

app.use((req, res, next) => {
	User.findByPk(1)
		.then((user) => {
			req.user = user; // also the user found by findByPk also contain helper methods not just object of information
			next();
		})
		.catch((err) => {
			console.log(err);
		});
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize
	// .sync({ force: true })
	.sync()
	.then((result) => {
		return User.findByPk(1); // finds the user in User model
	})
	.then((user) => {
		// check if the user exits if yes it return it otherwise it will create it and return it
		if (!user) {
			return User.create({ name: "Ram", email: "test@test.com" });
		}
		return user; // since this is in the async function the user will be wrapped and sent as promise. actually it was not a promise.
	})
	.then((user) => {
		return user.createCart(); // once the user if created create a empty cart for it
	})
	.then((cart) => {
		// gurranteed that user will be here
		// console.log(user);
		app.listen(3000);
		// we keep the listen method inside as we want to make sure that the server starts after the
		// sync operation has been completed.
	})
	.catch((err) => {
		console.log(err);
	});

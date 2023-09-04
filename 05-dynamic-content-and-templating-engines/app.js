// THIS PROJECT USES PUG AND HANDLEBARS
// FOR THE EJS I CREATED NEW ONE TO KEEP EVERYTHING SIMPLER TO UNDERSTAND TO ME LATER IN FUTURE.

const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars");

const app = express();

// "hbs" should be the extension of the handlebars template files now
// if you name it different then that should be the extension.
// since handlebars is not built-in in nodejs and node doesn't know it
// we have to use engine() method to use it.
app.engine(
	"hbs",
	expressHbs.engine({
		layoutsDir: "views/layouts",
		defaultLayout: "main-layout",
		extname: "hbs",
	})
);

// app.set("view engine", "pug");
app.set("view engine", "hbs");
app.set("views", "views");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
	res.status(404).render("404", { docTitle: "Page not found!" });
});

app.listen(3000);

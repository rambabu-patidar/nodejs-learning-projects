const express = require("express");
const path = require("path");

const bodyParser = require("body-parser");

const homeData = require("./routes/home");
const usersRoutes = require("./routes/users");
const rootDir = require("./util/path");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));

app.use(homeData.routes);
app.use(usersRoutes);

// "/" => Error Route
app.use("/", (req, res, next) => {
	res.render("404", { pageTitle: "Page not found", path: "" });
});

app.listen(3000);

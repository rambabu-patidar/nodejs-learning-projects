const express = require("express");
const path = require("path");

const rootDir = require("./util/path");

const bodyParser = require("body-parser"); // recommended to install it as third part bcz of express may or may not provid it.

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

// we define a middleware for the body parser because if the data is send on request then we need to parse it doesn't matter
// which middleware need it

// urlencoded() will parse only form data so don't except it to parse the file data or something else.
// we will learn how to do that later.

app.use(bodyParser.urlencoded({ extended: false }));

// This middleware which is responsible for providing static file to server
// which are present in public folder.
// we can add more then one middleware which provides access to static files
// static files can be anything from image, js file, css, to anything.
app.use(express.static(path.join(rootDir, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

// error middleware
// since all the other middleware are defined using their http request functions if the exact match
// doesn't happen this mean this path does not exist.
app.use("/", (req, res, next) => {
	res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});

app.listen(3000);

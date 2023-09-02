const express = require("express");

const app = express();

app.use((req, res, next) => {
	console.log("Default Middleware");
	next();
});

app.use("/about", (req, res, next) => {
	console.log("In about middleware!");
	res.send("<h1>In the About Page.</h1>");
});

app.use("/", (req, res, next) => {
	console.log("In the main page Middleware!", req.originalUrl);
	res.send("<h1>Home Page</h1>");
});

app.listen(3000);

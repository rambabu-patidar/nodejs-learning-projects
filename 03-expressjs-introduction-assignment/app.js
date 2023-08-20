// TASK FIRST

const express = require("express");

const app = express();

// TASK SECOND

// app.use((req, res, next) => {
// 	console.log("First Middleware,", " path: ", req.originalUrl);
// 	next();
// });

// app.use((req, res, next) => {
// 	console.log("Second Middleware,", " path: ", req.originalUrl);

// 	// res.setHeader("Content-Type", "text/html");
// 	// res.write("<h1>Nodejs assignment 2</h1>");
// 	// return res.end();
// 	res.send("<h1>Nodejs assignment 2</h1>");
// });

// if you see "/" or default middleware runs two times while execution its
// because one extra request is sent for favicon.ico
// starting listening to requests
// First Middleware,  path:  /
// Second Middleware,  path:  /
// First Middleware,  path:  /favicon.ico
// Second Middleware,  path:  /favicon.ico

// TASK THIRD
// simple trick: if middleware path is a substring of req.url then that middleware will run

app.use("/users", (req, res, next) => {
	console.log("users page middleware,", " path: ", req.originalUrl);
	res.send("<h1>The users Page</h1>");
});

app.use("/", (req, res, next) => {
	console.log("Home page middleware,", " path: ", req.originalUrl);
	res.send("<h1>Welcome to Home page!</h1>");
});

app.listen(3000, () => {
	console.log("starting listening to requests");
});

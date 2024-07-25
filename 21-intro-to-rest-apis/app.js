const express = require("express");

const bodyParser = require("body-parser");

const feedRoutes = require("./routes/feed");

const app = express();

// app.use(bodyParser.urlencoded({extended: false})); // "application/x-www-form-urlencoded" submit via <form>
app.use(bodyParser.json());

// set the CORS Headers
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH"
	);
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	next();
});

app.use("/feed", feedRoutes);

app.listen(8080, () => {
	console.log("Started listening on port 8080");
});

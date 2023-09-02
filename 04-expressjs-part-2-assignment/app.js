const express = require("express");
const path = require("path");

const bodyParser = require("body-parser");

const rootDir = require("./util/path");

const homeRoute = require("./routes/home");
const usersRoute = require("./routes/users");

const app = express();

// this will parse the data which we are getting.
app.use(bodyParser.urlencoded({ extended: false }));

// providing the files statically
app.use(express.static(path.join(rootDir, "public")));

app.use(homeRoute);
app.use(usersRoute);

// error middleware if no one is matched
app.use("/", (req, res, next) => {
	res.sendFile(path.join(rootDir, "view", "404.html"));
});

app.listen(3000);

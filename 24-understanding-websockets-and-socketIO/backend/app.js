const path = require("path");
const crypto = require("crypto");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const socketIO = require("./socket");

const rootDir = require("./util/path");

const feedRoutes = require("./routes/feed");
const authRoutes = require("./routes/auth");

const app = express();

const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join("public", "images"));
	},
	filename: (req, file, cb) => {
		crypto.randomBytes(16, (error, buffer) => {
			if (error) {
				throw new Error("Can't generate a token");
			}
			const token = buffer.toString("hex");
			cb(null, token + "-" + file.originalname);
		});
	},
});

const fileFilter = (req, file, cb) => {
	// pass true to second argument of cb to accept the file
	// pass false to second argument of cb to not accept it

	if (
		file.mimetype === "image/jpg" ||
		file.mimetype === "image/jpeg" ||
		file.mimetype === "image/png"
	) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

// app.use(bodyParser.urlencoded({extended: false})); // "application/x-www-form-urlencoded" submit via <form>
app.use(bodyParser.json());
app.use(
	multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

app.use(
	"/public/images",
	express.static(path.join(rootDir, "public", "images"))
);

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
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
	const status = error.statusCode || 500;
	const message = error.message;
	const data = error.data;
	console.log(error);
	res.status(status).json({ message: message, data: data });
});

mongoose
	.connect(
		"mongodb+srv://patidarrambabu135:<Password>@learningnodecluster01.q631tqm.mongodb.net/blog?retryWrites=true&w=majority&appName=LearningNodeCluster01"
	)
	.then(() => {
		console.log("Connected");
		const server = app.listen(8080, () => {
			console.log("Started listening on port 8080");
		});
		const io = socketIO.init(server);
		io.on("connection", (socket) => {
			// connection between client and the server.
			console.log("Connection is setted up.");
		});
	})
	.catch((err) => {
		console.log(err);
	});

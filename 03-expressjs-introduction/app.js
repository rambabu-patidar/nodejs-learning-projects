const express = require("express");

const app = express();

/*
One important thing to note here is that node doesn't runs the middleware callback function immediately when we are running the 
application.
They are callbacks and that means they are getting registered for their specified purposes.
They will only we called by the nodeJS when the criteria is met.
for example: if we have a "/about" path in the broweser and request method is anything we will run the below /about middleware


This is important to understand in order to not get confused that we are calling the app.listen() method at the bottom but defining the 
middleware function before them.
*/

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

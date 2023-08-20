const http = require("http");

const server = http.createServer((req, res) => {
	const url = req.url;
	const method = req.method;

	if (url === "/") {
		res.setHeader("Content-Type", "text/html");
		res.write("<html>");
		res.write("<head><title>First Assignment</title></head>");
		res.write(
			"<body><h1>First Assignment</h1> <form action='/create-user' method='POST'><input type='text' name='username'/><button type='submit'>Submit</button></form></body>"
		);
		res.write("</html>");
		return res.end();
	}

	if (url === "/users") {
		res.setHeader("Content-Type", "text/html");
		res.write("<html>");
		res.write("<head><title>Users List</title></head>");
		res.write(
			"<body><h1>Users List</h1><ul><li>User 1</li><li>User 2</li><li>User 3</li></ul></body>"
		);
		res.write("</html>");
		return res.end();
	}

	if (url === "/create-user" && method === "POST") {
		const body = [];
		req.on("data", (chunk) => {
			body.push(chunk);
		});

		return req.on("end", () => {
			const parsedBody = Buffer.concat(body).toString();
			const userName = parsedBody.split("=").at(1);
			console.log(userName);
			res.statusCode = 302;
			res.setHeader("Location", "/");
			return res.end();
		});
	}

	res.setHeader("Content-Type", "text/html");
	res.write("<html>");
	res.write("<head><title>First Assignment</title></head>");
	res.write("<body><h2>The page you are looking doesn't exist</h2></body>");
	res.write("</html>");
	res.end();
});

server.listen(3000);

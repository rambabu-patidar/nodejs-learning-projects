const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	// getting the token from the header of the request. but we may not have header set for unauthenticated user
	const authHeader = req.get("Authorization");

	if (!authHeader) {
		const error = new Error("Not Authenticated!");
		error.statusCode = 401;
		throw error;
	}
	// now we know that header is set so take out from that string ("Bearer token")
	const token = authHeader.split(" ")[1];
	let decodedToken;
	try {
		// short explanation: this will decode and verify that if the token is valid or not
		// long explanation: this will throw and err i.e. fails if the token is not present
		//                  hence you will lead in to catch block but if the toke is present
		//                  then it validate it that does this is the same token I generated,
		//                  if the token was not modified then this validation will succedd and
		//                decoded version of this token will be returned
		//                else undefined is returned.
		decodedToken = jwt.verify(token, "mysecret");
	} catch (err) {
		err.statusCode = 500;
		throw err; // will be caught by error MW of express.
	}

	// now check if the returned value is undefined (does validation went right of not)
	if (!decodedToken) {
		const error = new Error("Not Authenticated!");
		error.statusCode = 401;
		throw error;
	}

	req.userId = decodedToken.userId; // the data you passed in token is now available
	next();
};

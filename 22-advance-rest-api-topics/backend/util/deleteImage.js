const path = require("path");
const fs = require("fs");

const rootDir = require("./path");

module.exports = (filePath) => {
	fs.unlink(path.join(rootDir, filePath), (err) => {
		if (err) {
			console.log(err);
		}
	});
};

const { Server } = require("socket.io");

let io;

module.exports = {
	init: (httpServer) => {
		io = new Server(httpServer, {
			// from version 3 it becomes mendotary to suppies the cors configuration option.
			cors: {
				origin: "http://localhost:3000", // Update this to match your client URL
				methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
			},
		});

		return io;
	},
	getIO: () => {
		if (!io) {
			throw new Error("Socket is not initialized!");
		}
		return io;
	},
};

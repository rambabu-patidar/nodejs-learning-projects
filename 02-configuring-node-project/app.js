const http = require("http");
const routesObj = require("./routes");
const requestHandler = routesObj.handler;
const someText = routesObj.text;

console.log(someText);

// this create a server.
const server = http.createServer(requestHandler);

server.listen(3000);

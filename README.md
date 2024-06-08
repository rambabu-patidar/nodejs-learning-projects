# Module Execution in Node.js and Browsers and Execution of app.js file in Node.js

- Module in Javascript is just a file, like fun.js, as simple as it can get.

## Node.js Module Execution

1. **CommonJS Modules (`require`)**:

   - **Initial Execution**: When a module is first required, its code is executed.
   - **Caching**: The module.exports object is cached.
   - **Subsequent Requires**: Return the cached module.exports object without re-executing the module code.
   - **Example**:

     ```javascript
     // module.js
     console.log("Module code executed");
     module.exports = { message: "Hello" };

     // main.js
     const module = require("./module"); // 'Module code executed' is printed
     const moduleAgain = require("./module"); // Module code is not executed again
     console.log(module.message); // 'Hello'
     ```

2. **ES6 Modules (`import`)**:

   - **Initial Execution**: When a module is first imported, its code is executed.
   - **Caching**: The module is cached.
   - **Subsequent Imports**: Return the cached module without re-executing the module code.
   - **Example**:

     ```javascript
     // module.mjs
     console.log("Module code executed");
     export const message = "Hello";

     // main.mjs
     import { message } from "./module.mjs"; // 'Module code executed' is printed
     import { message as messageAgain } from "./module.mjs"; // Module code is not executed again
     console.log(message); // 'Hello'
     ```

## Browser Module Execution

1. **Script Tag (`<script>`)**:

   - **Each Load**: The script is executed every time the HTML file is loaded.
   - **Example**:
     ```html
     <!-- index.html -->
     <!DOCTYPE html>
     <html>
     	<head>
     		<title>Test</title>
     	</head>
     	<body>
     		<script src="script.js"></script>
     		<script src="script.js"></script>
     		<!-- script.js runs again -->
     	</body>
     </html>
     ```

2. **ES6 Modules (`import`)**:

   - **Initial Execution**: When a module is first imported, its code is executed.
   - **Caching**: The module is cached.
   - **Subsequent Imports**: Return the cached module without re-executing the module code.
   - **Example**:

     ```javascript
     // module.js
     console.log("Module code executed");
     export const message = "Hello";

     // main.js
     import { message } from "./module.js"; // 'Module code executed' is printed
     import { message as messageAgain } from "./module.js"; // Module code is not executed again
     console.log(message); // 'Hello'
     ```

## Execution of the Main File in Node.js

1. **Single Execution on Startup**:

   - When starting the application with `node app.js`, the contents of `app.js` are executed once.
   - Example:

     ```javascript
     // app.js
     const http = require("http");

     const server = http.createServer((req, res) => {
     	res.write("Hello from Node.js!");
     	res.end();
     });

     server.listen(3000, () => {
     	console.log("Server is running on port 3000");
     });
     ```

2. **Long-Running Process**:

   - The application keeps running to handle incoming requests or events.
   - The main file (`app.js`) is not re-executed unless the process is restarted.

3. **Restarting the Application**:

   - Stopping the Node.js process (e.g., using `Ctrl+C`) and starting it again with `node app.js` re-executes the file.
   - During development, tools like `nodemon` can automatically restart the application when file changes are detected.

4. **Development Tools**:
   - **Nodemon**: Automatically restarts the application on file changes.
   - **Installation and Usage**:
     ```bash
     npm install -g nodemon
     nodemon app.js
     ```

### Summary

- **Node.js Modules**:
  - CommonJS (`require`): Executes once, caches the result.
  - ES6 Modules (`import`): Executes once, caches the result.
- **Browser Modules**:
  - `<script>` tags: Executes each time the script is loaded.
  - ES6 Modules (`import`): Executes once, caches the result.
- **Main File in Node.js**:
  - Executes once on startup.
  - Remains running as a long-running process.
  - Not re-executed unless the process is restarted.
  - `nodemon` can be used for automatic restarts during development.

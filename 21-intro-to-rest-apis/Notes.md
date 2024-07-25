# REST API NOTES

- REST APIs focus on data, not user interface logic.
- They are standard Node servers with different data formats and response methods.
- REST APIs expose endpoints using HTTP methods and paths.
- Responses are in JSON format instead of HTML.
- REST APIs are decoupled from clients with no shared connection history.
- Requests and responses should use JSON format with the content type header set.
- Express.js sets the content type header automatically with the JSON method.
- In browsers, the fetch API requires manual header setting, while axios does it automatically.
- CORS errors occur when API and client are on different servers; they can be resolved by setting appropriate CORS headers.
- By setting appropiate CORS headers we say browser that "Hey I am setted in a way that you can access the data via my endpoints"
- If we set them to "\*" then it can say like "Hey I'm an public API you can make request and I will provide you the required data"

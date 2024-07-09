# Providing user feedback

**Problem:**
The application lacks proper user feedback for login errors and user registration issues. When users enter invalid credentials or attempt to register with an already existing email, they are redirected without any error messages displayed, leading to a poor user experience.

**Solution using connect-flash:**
The `connect-flash` package is introduced to solve this problem by providing a way to store messages in the session that are accessible on the next request and are then automatically removed. This allows the application to display error messages to users even after they are redirected.

**Steps Taken:**

1. **Install and Initialize connect-flash:**

   - Install the package using `npm install --save connect-flash`.
   - Require and initialize `connect-flash` in the application (e.g., in `app.js`).

2. **Set Flash Messages:**
   - In the authentication logic (e.g., `auth.js`), use `req.flash` to store error messages when login fails or when user registration encounters an issue.
3. **Retrieve and Display Flash Messages:**
   - On the login page render method, retrieve the flash messages using `req.flash`.
   - Pass these messages to the view (e.g., the login page).
   - In the view template (e.g., using EJS), check for the existence of the error message and display it if it exists.

**Outcome:**
When a user attempts to log in or register and encounters an error, they are redirected to the appropriate page with an error message displayed, improving the overall user experience.

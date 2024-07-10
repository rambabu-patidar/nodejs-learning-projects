# Very Very Important thing about express-session

we use the express-session and connect-mongodb-session packages to create a session
and store it in a database.

so session package will store all the sessions created in the mongoDB database

now what happens is that whenever a user visits the application for the first time, and loads any page the session will be created for it and will be stored in the database, but this session will not have any fields, and it happens because the first time it visits the application the
middlewares will run and the initialization of session will be done.

now when the user is logging-in new session is not created because we never said to do this it will just adds the fields we added in the postLogin

and when the user will log-out, we call session.destroy() so the session now will be destroyed and a new session will be created because a new request went when we logged out and that new request is a redirection request(now when it's case like user is visiting for first time)

SUMMARY:

// the thing is that the session is created if not exist on any page load
// and the session is really destroyed including from the database when used destroy() method.
// but we see in database that a new session gets added asap the logout happens and this is because of the new redirection request(considered by node js a brand new request);

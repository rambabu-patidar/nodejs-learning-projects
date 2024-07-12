while using this app in local environment make sure to add followings

1. Your `app password` in the pass key in auth.js controller (to know about `app password` go [here](https://support.google.com/accounts/answer/185833))

2. Your Email where ever you see mine.

3. your mongo db URI in `app.js`

## express-validator

two step process

1. check the inputs from req object and store the error on req object
2. use this errors in your controllers.

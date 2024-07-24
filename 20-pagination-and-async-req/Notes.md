# Pagination

We can use the methods which limits the data retrieveal from the database to
implement pagination for example we have :

```js
Product.find()
	.skip("number of items you want to skip")
	.limit("how many items you wnat")
	.then()
	.catch();
```

if you want to get the number of document in the collection then we use countDocuments method

```js
Product.find().countDocuments().then(numberOfDoc).catch();
```

# Async Request in NODE app

Untill we shown that the request are sent from the browser (some GET request and some POST request) and we send the response in the form of (render) or some data.

But some request can be of type in which we don't wanna send the data but just run some code behind the scene to do some stuff and that send the data to our user

Let's see some example:

we want to delete items but I don't want to re-render another page after we have delete item
as we are doing now, we are redirecting the user and that is loading a fresh new page.

We will do this by deleting our items using client side javascript
we write client side js to make request to our delete product route and then
remove the DOM element when its done.

just go here: /public/js/admin.js to see the code we wrote. Its very simple yarr.

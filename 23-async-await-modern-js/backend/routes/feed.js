const express = require("express");

const feedController = require("../controllers/feed");
const feedValidator = require("../validators/feed");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// GET /feed/posts
router.get("/posts", isAuth, feedController.getPosts);

// GET /feed/post/:postId
router.get("/post/:postId", isAuth, feedController.getPost);

// POST /feed/post
router.post("/post", isAuth, feedValidator.postPost, feedController.postPost);

// PUT /feed/post/:postId
router.put(
	"/post/:postId",
	isAuth,
	feedValidator.postPost,
	feedController.putPost
); // same validator as the post data is same.

// DELETE /feed/delete/:postId
router.delete("/post/:postId", isAuth, feedController.deletePost);

module.exports = router;

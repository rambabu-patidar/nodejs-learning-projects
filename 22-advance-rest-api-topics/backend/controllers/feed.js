const { validationResult } = require("express-validator");

const deleteImage = require("../util/deleteImage");
const Post = require("../models/post");
const User = require("../models/user");

const PER_PAGE = 2;

exports.getPosts = (req, res, next) => {
	const currentPage = req.query.page || 1;

	let totalItems;
	Post.find()
		.countDocuments()
		.then((count) => {
			totalItems = count;

			return Post.find()
				.skip((currentPage - 1) * PER_PAGE)
				.limit(PER_PAGE);
		})
		.then((posts) => {
			res.status(200).json({
				message: "Posts fetched successfully.",
				posts: posts,
				totalItems: totalItems,
			});
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.getPost = (req, res, next) => {
	const postId = req.params.postId;

	Post.findById(postId)
		.then((post) => {
			if (!post) {
				const error = new Error("No post with given Id exists!");
				error.statusCode = 404;
				throw error;
			}

			res
				.status(200)
				.json({ message: "Post fetched Successfully!", post: post });
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.postPost = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const error = new Error("Validation failed, Invalid user inputs!");
		error.statusCode = 422;
		throw error; // we can throw because we are in sync code
	}
	if (!req.file) {
		const error = new Error("No file was uploaded!");
		error.statusCode = 422;
		throw error;
	}

	const title = req.body.title;
	const content = req.body.content;
	const imageUrl = req.file.path;
	updatedImageUrl = imageUrl.replace(/\\/g, "/");

	const post = new Post({
		title: title,
		content: content,
		creator: req.userId,
		imageUrl: updatedImageUrl,
	});

	post
		.save()
		.then((savedPost) => {
			// we also need to add this post to user posts field
			// so find the user
			return User.findById(req.userId);
		})
		.then((user) => {
			// update the posts fields
			// mongoose will do the heavy lifting of creating new object
			user.posts.push(post);
			// save the user
			return user.save();
		})
		.then((savedUser) => {
			// return the response to cliet
			res.status(201).json({
				message: "Post created successfully!",
				post: post,
				creator: { _id: savedUser._id, name: savedUser.name },
			});
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.putPost = (req, res, next) => {
	const postId = req.params.postId;

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const error = new Error("Validation failed, Invalid user inputs!");
		error.statusCode = 422;
		throw error; // we can throw because we are in sync code
	}

	const updatedTitle = req.body.title;
	const updatedContent = req.body.content;
	let updatedImageUrl = req.body.image;
	if (req.file) {
		updatedImageUrl = req.file.path.replace(/\\/g, "/");
	}

	if (!updatedImageUrl) {
		const error = new Error("No image was picked");
		error.statusCode = 422;
		throw error;
	}

	Post.findById(postId)
		.then((post) => {
			if (!post) {
				const error = new Error("No post with given Id exists!");
				error.statusCode = 404;
				throw error;
			}

			// we found the post but the post is created by the same user who is logged in
			// if not then this user can't edit this.
			if (post.creator._id.toString() !== req.userId) {
				const error = new Error("Not Authorized to edit post");
				error.statusCode = 403;
				throw error;
			}
			post.title = updatedTitle;
			post.content = updatedContent;

			if (post.imageUrl !== updatedImageUrl) {
				deleteImage(post.imageUrl);
			}

			post.imageUrl = updatedImageUrl;

			return post.save();
		})
		.then((updatedPost) => {
			res
				.status(200)
				.json({ message: "Post updated successfully", post: updatedPost });
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.deletePost = (req, res, next) => {
	const postId = req.params.postId;

	Post.findById(postId)
		.then((post) => {
			if (!post) {
				const error = new Error("Post you wanna delete doesn't exists!");
				error.statusCode = 404;
				throw error;
			}
			// now I will have post
			// but does this post is created by the logged in user
			// if not throw an error of unauthorized
			if (post.creator._id.toString() !== req.userId) {
				const error = new Error("Not Authorized to delete post");
				error.statusCode = 403;
				throw error;
			}
			deleteImage(post.imageUrl);
			return post.deleteOne();
		})
		.then((result) => {
			return User.findById(req.userId);
		})
		.then((user) => {
			// this is the method provided by the mongoose to remove something from the document.
			user.posts.pull(postId);
			return user.save();
		})
		.then((savedUser) => {
			res.status(200).json({ message: "Post delete successfully" });
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

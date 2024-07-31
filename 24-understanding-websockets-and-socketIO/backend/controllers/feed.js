const { validationResult } = require("express-validator");

const io = require("../socket");
const deleteImage = require("../util/deleteImage");
const Post = require("../models/post");
const User = require("../models/user");

const PER_PAGE = 2;

exports.getPosts = async (req, res, next) => {
	const currentPage = req.query.page || 1;

	try {
		const totalItems = await Post.find().countDocuments();
		const posts = await Post.find()
			.populate("creator")
			.sort({ createdAt: -1 })
			.skip((currentPage - 1) * PER_PAGE)
			.limit(PER_PAGE);

		res.status(200).json({
			message: "Posts fetched successfully.",
			posts: posts,
			totalItems: totalItems,
		});
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.getPost = async (req, res, next) => {
	const postId = req.params.postId;
	try {
		const post = await Post.findById(postId);

		if (!post) {
			const error = new Error("No post with given Id exists!");
			error.statusCode = 404;
			throw error;
		}
		res.status(200).json({ message: "Post fetched Successfully!", post: post });
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.postPost = async (req, res, next) => {
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

	try {
		const savedPost = await post.save();

		const user = await User.findById(req.userId);

		user.posts.push(post);

		const savedUser = await user.save();

		io.getIO().emit("posts", {
			action: "create",
			post: { ...post._doc, cretor: { _id: req.userId, name: user.name } },
		});
		res.status(201).json({
			message: "Post created successfully!",
			post: post,
			creator: { _id: savedUser._id, name: savedUser.name },
		});
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.putPost = async (req, res, next) => {
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

	try {
		const post = await Post.findById(postId).populate();

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

		const updatedPost = await post.save();
		io.getIO().emit("posts", { action: "update", post: updatedPost });
		res
			.status(200)
			.json({ message: "Post updated successfully", post: updatedPost });
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.deletePost = async (req, res, next) => {
	const postId = req.params.postId;
	try {
		const post = await Post.findById(postId);

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

		const result = await post.deleteOne();

		const user = await User.findById(req.userId);

		// this is the method provided by the mongoose to remove something from the document.
		user.posts.pull(postId);

		const savedUser = await user.save();

		io.getIO().emit("posts", { action: "delete", postId: postId });

		res.status(200).json({ message: "Post delete successfully" });
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

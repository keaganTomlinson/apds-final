const router = require("express").Router();
const { createPost, deletePost, getPosts } = require("../Controllers/PostController");
const { userVerification } = require("../Middlewares/AuthMiddleware");

// Handle POST requests to create a new post
router.post('/posts', createPost);

// Handle DELETE requests to delete a post by ID
router.delete('/posts/:postId',  deletePost);

// Handle GET requests to retrieve all posts
router.get('/viewposts', getPosts);

module.exports = router;

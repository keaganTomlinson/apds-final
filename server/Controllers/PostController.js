const Post = require("../models/PostModel");

// Controller function to create a new post


module.exports.createPost = async (req, res, next) => {
  try {
    const { name, message, username ,createdAt } = req.body;

   
    const newPost = await Post.create({createdAt, name, message, username });
    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
      console.log(newPost)
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to delete a post by ID
module.exports.deletePost = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({ message: "Post deleted successfully", post: deletedPost });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};



// Controller function to retrieve all posts
module.exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.json(posts);
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

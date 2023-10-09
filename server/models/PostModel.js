const mongoose = require("mongoose");

// Define the post schema
const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Post name is required"],
  },
  message: {
    type: String,
    required: [true, "Post message is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// Create and export the Post model based on the post schema
const Post = mongoose.model("Post", postSchema);
module.exports = Post;

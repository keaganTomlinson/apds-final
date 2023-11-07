import React, { useState, useEffect } from "react";
import axios from "axios";
import "./viewposts.css"; // Import CSS file for styling

const ViewPosts = () => {
  const [posts, setPosts] = useState([]);

  const handleDelete = async (postId) => {
    try {
      // Make a DELETE request to the server to delete the post
      await axios.delete(`https://localhost:8080/posts/posts/${postId}`, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      // Remove the deleted post from the state
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      // Handle error, e.g., show an error message to the user
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("https://localhost:8080/posts/viewposts", {
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (response.status === 200) {
          setPosts(response.data);
        } else {
          console.error("Error fetching posts:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="posts-container">
      <h1>Posts</h1>
      <ul className="posts-list">
        {posts.map((post) => (
          <li className="post-item" key={post._id}>
            <div className="post-content">
              <strong>{post.name}</strong> - {post.message} (Posted by: {post.username})
            </div>
            <button className="delete-button" onClick={() => handleDelete(post._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewPosts;

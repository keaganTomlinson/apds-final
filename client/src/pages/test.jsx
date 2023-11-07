import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [postData, setPostData] = useState({
    name: "",
    message: "",
    username: ""
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // If token is not present, navigate to the login page
      navigate("/login");
      return;
    }

   

    
  }, [navigate]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleSubmit = () => {
    // Your submit logic using postData
    axios.post("https://localhost:8080/posts/posts", postData, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        console.log("Post created successfully:", response.data);
        // Optionally, you can reset the form or show a success message here
      })
      .catch(error => {
        console.error("Error creating post:", error);
        // Handle error here, e.g., show an error message to the user
      });
  };

  const handleViewPosts = () => {
    navigate("/posts"); // Redirect to the posts page
  };

  return (
    <div style={{ textAlign: "center", marginTop: "200px" }}>
      <h1>Create a New Post</h1>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="name">Post Title:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={postData.name}
          onChange={handleInputChange}
          style={{ width: "300px", fontSize: "20px" }}
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="message">Post Message:</label>
        <textarea
          id="message"
          name="message"
          value={postData.message}
          onChange={handleInputChange}
          style={{ width: "300px", height: "150px", fontSize: "20px" }}
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="username">Your Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={postData.username}
          onChange={handleInputChange}
          style={{ width: "300px", fontSize: "20px" }}
        />
      </div>
      <button onClick={handleSubmit} style={{ fontSize: "20px" }}>Submit Post</button>
      <div style={{ marginTop: "20px" }}>
        <button onClick={handleViewPosts} style={{ fontSize: "20px" }}>View Posts</button>
      </div>
    </div>
  );
};

export default Home;

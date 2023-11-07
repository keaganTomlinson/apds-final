import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    name: "",
    message: "",
  });

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:8080",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      if (status) {
        toast(`Hello ${user}`, {
          position: "top-right",
        });
        // Fetch posts
        const response = await axios.get("http://localhost:8080/posts/viewposts");
        setPosts(response.data.posts);
      } else {
        removeCookie("token");
        navigate("/login");
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleAddPost = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/posts/posts",
        {
          name: newPost.name,
          message: newPost.message,
          username: username,
        },
        { withCredentials: true }
      );
      if (response.status === 201) {
        // Update the posts after adding a new post
        const updatedPosts = [...posts, response.data.post];
        setPosts(updatedPosts);
        toast("Post added successfully!", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error adding post: ", error);
    }
  };

  const handleLogout = () => {
    removeCookie("token");
    navigate("/login");
  };

  return (
    <>
      <div className="home_page">
        <h4>
          Welcome <span>{username}</span>
        </h4>
        <div className="post-form">
          <input
            type="text"
            name="name"
            placeholder="Post Name"
            value={newPost.name}
            onChange={handleInputChange}
          />
          <textarea
            name="message"
            placeholder="Post Message"
            value={newPost.message}
            onChange={handleInputChange}
          />
          <button onClick={handleAddPost}>Add Post</button>
        </div>
        <div className="posts">
          <h2>Posts</h2>
          {posts.map((post) => (
            <div key={post.id} className="post">
              <h3>{post.name}</h3>
              <p>{post.message}</p>
              <p>Posted by: {post.username}</p>
            </div>
          ))}
        </div>
        <button onClick={handleLogout}>LOGOUT</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;

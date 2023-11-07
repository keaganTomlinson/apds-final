import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleLoginSuccess = (token) => {
    localStorage.setItem("token", token);
    // Redirect the user to the home page after successful login
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      handleError("Email and password are required.");
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "https://localhost:8080/auth/Login",
        {
          ...inputValue,
        }
      );

      const { success, message, token } = data;
      if (success) {
        handleSuccess(message);
        // Call the function to handle successful login with the received token
        handleLoginSuccess(token);
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
      setInputValue({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="form_container">
      <h2>Login Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Submit"}
        </button>
        <span>
          Already have an account? <Link to={"/signup"}>Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;

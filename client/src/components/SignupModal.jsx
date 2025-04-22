import React, { useState } from "react";
import "./SignupModal.css";
import { signupUser, loginUser } from "../utils/authService";
import socket from "../utils/socket";

const SignupModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(false); // Toggle login/signup

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ name: "", email: "", password: "", phone: "" }); // reset form
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("📤 Form Data:", formData);

      let res;
      if (isLogin) {
        res = await loginUser({
          email: formData.email,
          password: formData.password,
        });
      } else {
        res = await signupUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        });
      }

      console.log("✅ API Response:", res.data);

      if (res?.data?.token) {
        localStorage.setItem("authToken", res.data.token);
        alert(`${isLogin ? "Login" : "Signup"} successful!`);
        socket.connect(); // reconnect socket
        onClose(); // close modal
      } else {
        alert("❌ Token not received from server");
      }
    } catch (err) {
      console.error("❌ Error:", err);
      alert(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>{isLogin ? "Log In" : "Create Your Account"}</h2>

        <form onSubmit={handleSubmit}>
          {isLogin ? (
            <>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type="submit">Log In</button>
            </>
          ) : (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Contact Number"
                value={formData.phone}
                onChange={handleChange}
              />
              <button type="submit">Sign Up</button>
            </>
          )}
        </form>

        <p className="login-text">
          {isLogin ? (
            <>Don't have an account? <a href="#" onClick={toggleForm}>Sign Up</a></>
          ) : (
            <>Already have an account? <a href="#" onClick={toggleForm}>Log In</a></>
          )}
        </p>
      </div>
    </div>
  );
};

export default SignupModal;

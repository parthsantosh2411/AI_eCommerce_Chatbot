import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignupModal from "./SignupModal";  // Import the modal component
import "./Navbar.css";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const openModal = () => setIsModalOpen(true); // Open modal function
  const closeModal = () => setIsModalOpen(false); // Close modal function

  const isLoggedIn = localStorage.getItem("authToken"); // Check if the user is logged in

  const handleAuthAction = () => {
    if (isLoggedIn) {
      // If logged in, log the user out
      localStorage.removeItem("authToken"); // Remove auth token
      window.location.reload(); // Optionally reload the page to update the UI
    } else {
      // If not logged in, open the signup modal
      openModal();
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/features">Features</Link>
          <Link to="/chatbot">ChatBot</Link>
          <Link to="/about">About Us</Link>
        </div>
        <button onClick={handleAuthAction} className="signup-btn">
          {isLoggedIn ? "Log Out" : "Sign Up"} {/* Conditionally change button text */}
        </button>
      </div>

      {/* Conditionally render the modal */}
      {isModalOpen && <SignupModal onClose={closeModal} />}
    </nav>
  );
};

export default Navbar;

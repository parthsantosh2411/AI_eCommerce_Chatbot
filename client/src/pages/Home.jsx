import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link
import "./Home.css";

const Home = () => {
  return (
    <div className="home-wrapper">
      <motion.div
        className="home-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="brand-name"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          BUYBUDDY
        </motion.h1>

        <motion.div
          className="home-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <h2>Shop Smart, Live Better</h2>
          <p>Experience the future of AI-powered shopping.</p>
          <div className="button-group">
            {/* Use Link to navigate to the About page */}
            <Link to="/about" className="btn-grad">
              Learn More
            </Link>
            <Link to="/chatbot" className="btn-grad">
              Chat Now
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;

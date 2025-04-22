import React from 'react';
import './Features.css';

const Features = () => {
  return (
    <div className="features-container">
      <h1 className="features-heading">Features</h1>

      <div className="feature" data-aos="fade-up">
        <h2 className="feature-title">🚀 AI-Powered Chatbot</h2>
        <p className="feature-description">
          Instant 24/7 support to assist customers with queries and shopping assistance.
        </p>
      </div>

      <div className="feature" data-aos="fade-up">
        <h2 className="feature-title">🔍 Smart Recommendations</h2>
        <p className="feature-description">
          Personalized shopping suggestions based on browsing history and preferences.
        </p>
      </div>

      <div className="feature" data-aos="fade-up">
        <h2 className="feature-title">🛒 Seamless Checkout</h2>
        <p className="feature-description">
          Frictionless and secure payment options for a better user experience.
        </p>
      </div>
    </div>
  );
};

export default Features;

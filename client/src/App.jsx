import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Features from "./pages/Features";
import Chatbot from "./pages/Chatbot";
import About from "./pages/About";
import ChatComponent from "./components/ChatComponent"; // ✅ Import WebSocket Chat Component
import AOS from "aos";
import "aos/dist/aos.css";

import "./styles.css";
import "./index.css"; // Import global styles

AOS.init({
  duration: 800, // Animation duration
  offset: 200,   // Offset (in px) from the original trigger point
});

function App() {
  return (
    <Router>
      <div className="App"></div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/about" element={<About />} />
        <Route path="/chat" element={<ChatComponent />} /> {/* ✅ Added WebSocket Chat Route */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
  
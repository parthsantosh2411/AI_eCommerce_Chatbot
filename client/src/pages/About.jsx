import React, { useRef } from "react";
import "./About.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

const teamMembers = [
  {
    name: "Jheel Turakhia",
    role: "Frontend Developer",
    image: "/jheel.jpg",
    description:
      "Passionate about creating sleek, responsive UI/UX designs that provide seamless user experiences across devices.",
    linkedin: "https://linkedin.com/in/jheel",
    github: "https://github.com/Jheel11"
  },
  {
    name: "Parth Tripathi",
    role: "Backend Developer",
    image: "/parth.jpg",
    description:
      "Expert in building scalable systems, clean APIs, and real-time data handling with WebSockets to support smooth app functionality.",
    linkedin: "https://www.linkedin.com/in/parth-tripathi-658805249/?originalSubdomain=in",
    github: "https://github.com/parthtripathi"
  },
  {
    name: "Khushi Pancal",
    role: "AI/ML Engineer",
    image: "/khushi.jpg",
    description:
      "Focused on developing ethical AI solutions and machine learning models to enhance the chatbot’s learning and interaction capabilities.",
    linkedin: "https://www.linkedin.com/in/khushi-panchal-7840b3287/",
    github: "https://github.com/khushipanchal0108"
  },
];

const About = () => {
  const teamRef = useRef(null);

  const scrollToTeam = () => {
    teamRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="about-wrapper">
      {/* Main About Section */}
      <div className="about-container">
        <div className="about-left">
          <img src="/Image.jpg" alt="Studio Exterior" />
        </div>

        <div className="about-right">
          <h1>Built for the Thinkers</h1>
          <p>
            Building with AI isn’t just about code — it’s about understanding people. Our journey started with a simple idea: make online shopping smarter, more personal.
          </p>
          <p>
            What began as a small experiment turned into a vision: a chatbot that listens, learns, and helps. This is where thoughtful tech meets real-world impact.
          </p>
          <p>
            Welcome to the beginning of something intelligent.
          </p>
          <button className="scroll-btn" onClick={scrollToTeam}>
            Meet the Team ↓
          </button>
        </div>
      </div>

      {/* Team Section */}
      <div className="team-section" ref={teamRef}>
        <h2 className="team-heading">Meet the Team</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <img src={member.image} alt={member.name} />
              <div className="team-info">
                <h3>{member.name}</h3>
                <p className="role">{member.role}</p>
                <p>{member.description}</p>
                <div className="team-socials">
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                  )}
                  {member.github && (
                    <a href={member.github} target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faGithub} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;

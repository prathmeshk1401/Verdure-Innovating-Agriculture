import React from "react";
import farmingImg from "../assets/farming.jpg"; // Adjust the path as needed

// About.jsx

const About = () => (
    <section className="about-section" id="about">
        <div className="about-container">
            <div className="about-image">
                <img src={farmingImg} alt="VERDURE Farming Solutions" />
            </div>
            <div className="about-content">
                <p id="mission-tag">Our Mission</p>
                <h1>Empowering Farmers with Smart Solutions</h1>
                <p>
                    <span id="verdure-span">VERDURE</span> bridges the gap between traditional and smart farming by
                    providing AI-driven solutions, expert guidance, and a supportive community which attracts new
                    generation towards farming.
                </p>
                <ul className="about-features">
                    <li>AI-powered farming insights</li>
                    <li>Real-time crop monitoring</li>
                    <li>Data-driven decision-making</li>
                    <li>Community of expert farmers</li>
                </ul>
                <a href="#signup" className="btn primary">Join Us</a>
            </div>
        </div>
    </section>
);

export default About;
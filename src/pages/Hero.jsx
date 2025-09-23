import React from "react";
import heroImage from "../assets/crop market.JPG"; // Adjust the path as needed
import { Link } from "react-router-dom";

// Hero.jsx

const Hero = () => (
    <section className="hero" id="home">
        <div className="hero-content">
            <div className="content-wrapper">
                <p id="name">Innovating Agriculture</p>
                <h1>
                    Empower Your Farming with <span>VERDURE</span>
                </h1>
                <p className="tagline">
                    Transform your agricultural practices with AI-powered solutions, expert guidance, and
                    a supportive community.
                </p>
                <div className="homeButton-container">
                    <Link to="/Signup" className="btn primary">Get Started</Link>
                        
                    <Link to="src/pages/About.jsx" className="btn secondary">
                        Learn More
                    </Link>
                </div>
            </div>
        </div>
        <div className="hero-image">
            <img src={heroImage} alt="Brand Illustration" />
        </div>
    </section>
);

export default Hero;
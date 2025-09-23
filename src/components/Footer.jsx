import React from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const location = useLocation();
    const isMainPage = location.pathname === "/";

    const scrollToSection = (id) => {
        if (isMainPage) {
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        } else {
            window.location.href = `/#${id}`;
        }
    };

    return (
        <footer className="site-footer">
            <div className="footer-container">
                {/* Quick Links Section */}
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul className="footer-links">
                        <li><button onClick={() => scrollToSection("home")}>Home</button></li>
                        <li><button onClick={() => scrollToSection("about")}>About</button></li>
                        <li><button onClick={() => scrollToSection("services")}>Services</button></li>
                        <li><button onClick={() => scrollToSection("testimonials")}>Testimonials</button></li>
                        <li><button onClick={() => scrollToSection("contact")}>Contact</button></li>
                    </ul>
                </div>

                {/* Newsletter Section */}
                <div className="footer-section">
                    <h4>Stay Updated</h4>
                    <form className="newsletter-form">
                        <input type="email" placeholder="Enter your email" required />
                        <button type="submit">Subscribe</button>
                    </form>
                </div>

                {/* Legal Information */}
                <div className="footer-section">
                    <h4>Legal</h4>
                    <ul className="footer-links">
                        <li><Link className="links" to="/privacyPolicy">Privacy Policy</Link></li>
                        <li><Link className="links" to="/terms">Terms of Service</Link></li>
                    </ul>
                </div>

                {/* Copyright Information */}
                <div className="footer-section">
                    <p className="copyright">
                        © <span>{currentYear}</span> VERDURE. All rights reserved.<br />
                        Content and materials on this site are protected by copyright law.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

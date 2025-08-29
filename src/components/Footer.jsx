import React from "react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <div className="footer-container">
                {/* Quick Links Section */}
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul className="footer-links">
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#testimonials">Testimonials</a></li>
                        <li><a href="#contact">Contact</a></li>
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
                        <li><a href="/PrivacyPolicy">Privacy Policy</a></li>
                        <li><a href="/terms">Terms of Service</a></li>
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
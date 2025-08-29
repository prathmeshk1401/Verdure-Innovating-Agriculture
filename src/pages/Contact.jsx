import React, { useState } from "react";
import images from "../utils/importImages";

const Contact = () => {
    const [form, setForm] = useState({
        your_name: "",
        email: "",
        message: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
        setError("");
    };

    const validateForm = () => {
        if (!form.your_name || !form.email || !form.message) {
            setError("Please fill in all fields.");
            return false;
        }
        // Basic email validation
        if (!/\S+@\S+\.\S+/.test(form.email)) {
            setError("Please enter a valid email.");
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Handle form submission (e.g., send to backend)
            setError("");
            alert("Message sent! (Demo only)");
            setForm({ your_name: "", email: "", message: "" });
        }
    };

    return (
        // Contact Section
        <section className="contact" id="contact">
            <div className="contact-container">
                {/* Left Side: Contact Form + Business Hours */}
                <div className="contact-left">
                    <h2>Contact VERDURE</h2>
                    <form className="contact-form" onSubmit={handleSubmit} autoComplete="off">
                        <input
                            type="text"
                            id="your_name"
                            placeholder="Your Name"
                            value={form.your_name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            id="email"
                            placeholder="Your Email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            id="message"
                            rows="3"
                            placeholder="Your Message"
                            value={form.message}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit">Send Message</button>
                        <p id="error-message" className="error-message">{error}</p>
                    </form>

                    {/* Business Hours */}
                    <div className="business-hours">
                        <h3>Business Hours</h3>
                        <p><strong>Monday - Friday:</strong> 9 AM - 6 PM</p>
                        <p><strong>Saturday:</strong> 10 AM - 4 PM</p>
                        <p><strong>Sunday:</strong> Closed</p>
                    </div>
                </div>

                {/* Right Side: Contact Info + Social Links + Map */}
                <div className="contact-right">
                    <h2>Get in Touch</h2>
                    <p>If you have any questions, suggestions, or need support, feel free to reach out.</p>

                    <div className="contact-info">
                        <p><strong>Email:</strong> <a href="mailto:verduretemp@gmail.com">verduretemp@gmail.com</a></p>
                        <p><strong>Call:</strong> <a href="tel:+1234567890">+123 456 7890</a> (Note: Actual phone number coming soon)</p>
                        <p><strong>Address:</strong> 123 Agri Street, Pune, Maharashtra. <br />(Placeholder, Office Coming Soon)</p>
                    </div>

                    {/* Social Links */}
                    <div className="social-icons">
                        <a href="https://x.com/verdureconnect"><img src={images["twitter.png"]} alt="Twitter" /></a>
                        <a href="https://www.facebook.com/share/1EmYRSuaZ8/"><img src={images["facebook.png"]} alt="Facebook" /></a>
                        <a href="https://www.instagram.com/verdurefarmconnect"><img src={images["instagram.png"]} alt="Instagram" /></a>
                        <a href="https://wa.me/919673653761"><img src={images["whatsapp.png"]} alt="WhatsApp" /></a>
                    </div>

                    {/* Google Map Embed */}
                    <iframe
                        title="Verdure Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345093745!2d144.95373631590445!3d-37.81720997975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce6e0!2sAgriAid!5e0!3m2!1sen!2sin!4v1617992487048!5m2!1sen!2sin"
                        width="100%"
                        height="180"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

export default Contact;
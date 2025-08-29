import React, { useState } from "react";
import styles from "./styles/Signup.module.css";

const Signup = () => {
    const [phone, setPhone] = useState("");
    const [phoneMessage, setPhoneMessage] = useState("");
    const [password, setPassword] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");
    const [termsChecked, setTermsChecked] = useState(false);
    const [termsError, setTermsError] = useState(false);

    // Live password validation example
    const showLiveValidation = (value) => {
        setPassword(value);
        if (value.length < 6) {
            setPasswordMessage("Password must be at least 6 characters.");
        } else {
            setPasswordMessage("");
        }
    };

    // Phone validation example
    const handlePhoneChange = (e) => {
        const value = e.target.value;
        setPhone(value);
        if (!/^\d{10}$/.test(value)) {
            setPhoneMessage("Enter a valid 10-digit phone number.");
        } else {
            setPhoneMessage("");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!termsChecked) {
            setTermsError(true);
            return;
        }
        setTermsError(false);
        // Handle signup logic here
    };

    return (
        <>
            <div className={styles.signupContainer}>
                <div className={styles.signupForm}>
                    <h2 className={styles.signupTitle}>Join VERDURE</h2>
                    <form id="signup-form" onSubmit={handleSubmit} autoComplete="off">
                        <div className={styles.inputGroup}>
                            <input className={styles.signupInput} type="text" placeholder="Full Name" required />
                        </div>
                        <div className={styles.inputGroup}>
                            <input
                                className={styles.signupInput}
                                type="tel"
                                placeholder="Phone Number"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={phone}
                                onChange={handlePhoneChange}
                                required
                            />
                            <span id="phoneMessage" className={styles.error}>
                                {phoneMessage}
                            </span>
                        </div>
                        <div className={styles.inputGroup}>
                            <input className={styles.signupInput} type="email" placeholder="Email" required />
                        </div>
                        <div className={styles.inputGroup}>
                            <input
                                className={styles.signupInput}
                                type="password"
                                placeholder="Password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => showLiveValidation(e.target.value)}
                                required
                            />
                            <span id="message" className={styles.error}>
                                {passwordMessage}
                            </span>
                        </div>
                        <div className={styles.termsSection}>
                            <input
                                type="checkbox"
                                id="terms"
                                checked={termsChecked}
                                onChange={(e) => setTermsChecked(e.target.checked)}
                                required
                            />
                            <label htmlFor="terms">
                                I agree to the{" "}
                                <a href="/terms" target="_blank" rel="noopener noreferrer">
                                    Terms of Service
                                </a>
                            </label>
                        </div>
                        {termsError && (
                            <div className={styles.errorMessage} id="termsError">
                                You must agree to the Terms of Service
                            </div>
                        )}
                        <button type="submit" className={styles.signupButton}>Sign Up</button>
                        <button className={styles.googleBtn} type="button">
                            <img
                                src="https://www.svgrepo.com/show/355037/google.svg"
                                alt="Google Logo"
                            />
                            Continue with Google
                        </button>
                        <div className={styles.toggleForm}>
                            Already have an account? <a href="/login">Sign In</a>
                        </div>
                    </form>
                </div>
            </div>

            {/* FontAwesome CDN */}
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
            />
            <script
                src="https://kit.fontawesome.com/b48bac47ea.js"
                crossOrigin="anonymous"
            ></script>
            {/* Multilingual support */}
            <script>
                {`
                    window.gtranslateSettings = {
                        "default_language": "en",
                        "native_language_names": true,
                        "detect_browser_language": true,
                        "languages": ["en", "hi", "mr", "ta", "te"],
                        "wrapper_selector": ".gtranslate_wrapper",
                        "flag_size": 16,
                        "switcher_horizontal_position": "inline",
                        "switcher_open_direction": "top",
                        "flag_style": "3d"
                    }
                `}
            </script>
            <script src="https://cdn.gtranslate.net/widgets/latest/dwf.js" defer></script>
        </>
    );
};

export default Signup;
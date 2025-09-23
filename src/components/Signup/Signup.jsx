import React, { useState } from "react";
import styles from "./Signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import API_BASE from "../../utils/apiBase";

const Signup = () => {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [termsChecked, setTermsChecked] = useState(false);
    const [termsError, setTermsError] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const showLiveValidation = (value) => {
        setFormData({ ...formData, password: value });
        if (value.length < 6) {
            setPasswordMessage("Password must be at least 6 characters");
        } else {
            setPasswordMessage("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setTermsError(false);

        if (!termsChecked) {
            setTermsError(true);
            return;
        }

        if (formData.password.length < 6) {
            setPasswordMessage("Password must be at least 6 characters");
            return;
        }

        setIsSubmitting(true);

        try {
            console.log("Submitting signup to:", `${API_BASE}/api/auth/signup`);
            console.log("Form data:", formData);

            const res = await fetch(`${API_BASE}/api/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            console.log("Response status:", res.status);
            const data = await res.json();
            console.log("Response data:", data);

            if (res.ok) {
                localStorage.setItem("verdure_token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user || { username: formData.username, email: formData.email, role: "user" }));
                setShowPopup(true);
                setTimeout(() => {
                    setShowPopup(false);
                    navigate("/dashboard");
                }, 2000);
            } else {
                setErrorMessage(data.message || data.msg || "Registration failed. Please try again.");
            }
        } catch (err) {
            console.error("Signup error:", err);
            setErrorMessage("Unable to connect to server. Please check your connection and try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.signupContainer}>
            {showPopup && (
                <div className={styles.popup}>
                    Welcome to Verdure! Your registration was successful 🌿
                </div>
            )}
            <div className={styles.signupForm}>
                <h2 className={styles.signupTitle}>Join VERDURE</h2>
                <form id="signup-form" onSubmit={handleSubmit} autoComplete="off">
                    <div className={styles.inputGroup}>
                        <input
                            className={styles.signupInput}
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Full Name"
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            className={styles.signupInput}
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            className={styles.signupInput}
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={(e) => showLiveValidation(e.target.value)}
                            placeholder="Password"
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
                            onChange={(e) => {
                                setTermsChecked(e.target.checked);
                                setTermsError(false);
                            }}
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
                    {errorMessage && (
                        <div className={styles.errorMessage} style={{ color: 'red', marginBottom: '10px' }}>
                            {errorMessage}
                        </div>
                    )}
                    <button type="submit" className={styles.signupButton} disabled={isSubmitting}>
                        {isSubmitting ? "Creating Account..." : "Sign Up"}
                    </button>
                    <button className={styles.googleBtn} type="button">
                        <img
                            src="https://www.svgrepo.com/show/355037/google.svg"
                            alt="Google Logo"
                        />
                        Continue with Google
                    </button>
                    <div className={styles.toggleForm}>
                        Already with Verdure? <Link to="/login">Sign in</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;

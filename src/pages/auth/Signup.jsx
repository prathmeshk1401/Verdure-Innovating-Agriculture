import React, { useState } from "react";
import styles from "./styles/Signup.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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

        if (!termsChecked) {
            setTermsError(true);
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            console.log(data); // "User registered successfully"
            if (res.ok) {
                localStorage.setItem("verdure_token", data.token);
                setShowPopup(true);
                setTimeout(() => {
                    setShowPopup(true);
                    navigate("/user-dashboard/Dashboard");
                }, 2000);
            } else {
                alert(data.msg);
            }

        } catch (err) {
            console.error(err);
        }
    };

    return (

        <div className={styles.signupContainer}>
            {showPopup && (
                <div className={styles.popup}>
                    Welcome to Verdure! Your registration was a successfull.🌿
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
                        Already with Verdure? <Link to="/login">Sign in</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;

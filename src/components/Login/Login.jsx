import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import API_BASE from "../../utils/apiBase";

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loginMessage, setLoginMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Live password validation
    const validatePassword = (value) => {
        setLoginMessage(value.length < 6 ? "Password must be at least 6 characters" : "");
    };

    // Submit login form
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSubmitting(true);
            setLoginMessage("");
            const res = await fetch(`${API_BASE}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                // Save token and user info
                localStorage.setItem("verdure_token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                // Show success popup
                setShowPopup(true);


                // Redirect based on role
                setTimeout(() => {
                    if (data.user.role === "admin") {
                        const adminBase = process.env.REACT_APP_ADMIN_URL || "http://localhost:5173";
                        const redirectUrl = `${adminBase}/#/dashboard?token=${encodeURIComponent(data.token)}`;
                        console.log("Redirecting admin to:", redirectUrl);
                        window.location.assign(redirectUrl);
                    } else {
                        navigate("/dashboard");
                    }
                }, 500);
            } else {
                setLoginMessage(data.message || "Invalid email or password");
            }
        } catch (err) {
            console.error("Login error:", err);
            setLoginMessage("Unable to reach server. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    // Load Font Awesome once
    useEffect(() => {
        const fontAwesome = document.createElement("script");
        fontAwesome.src = "https://kit.fontawesome.com/b48bac47ea.js";
        fontAwesome.crossOrigin = "anonymous";
        document.body.appendChild(fontAwesome);

        return () => {
            document.body.removeChild(fontAwesome);
        };
    }, []);

    return (
        <div className={styles.loginContainer}>
            {showPopup && (
                <div className={styles.popup}>
                    Welcome back to your farming future 🌱👨‍🌾
                </div>
            )}

            <div className={styles.signinForm}>
                <h2 className={styles.loginTitle}>Welcome Back</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className={styles.loginInput}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={(e) => {
                                handleChange(e);
                                validatePassword(e.target.value);
                            }}
                            placeholder="Password"
                            className={styles.loginInput}
                            required
                        />
                        <span className={styles.error}>{loginMessage}</span>
                    </div>

                    <button type="submit" className={styles.loginButton} disabled={submitting}>
                        {submitting ? "Signing in..." : "Sign In"}
                    </button>

                    <button type="button" className={styles.googleBtn}>
                        <img
                            src="https://www.svgrepo.com/show/355037/google.svg"
                            alt="Google Logo"
                        />
                        Continue with Google
                    </button>

                    <div className={styles.toggleForm}>
                        Don't have an account? <Link to="../Signup">Create One</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
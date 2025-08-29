import React, { useState } from "react";
import styles from "./styles/Login.module.css";



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginMessage, setLoginMessage] = useState("");

    const showLiveValidation = (value) => {
        if (value.length < 6) {
            setLoginMessage("Password must be at least 6 characters");
        } else {
            setLoginMessage("");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
    };

    React.useEffect(() => {
        // Load external scripts for FontAwesome and GTranslate
        const fontAwesome = document.createElement("script");
        fontAwesome.src = "https://kit.fontawesome.com/b48bac47ea.js";
        fontAwesome.crossOrigin = "anonymous";
        document.body.appendChild(fontAwesome);

        return () => {
            document.body.removeChild(fontAwesome);
        };
    }, []);

    return (
        <>
            <div className={styles.loginContainer}>
                <div className={styles.signinForm}>
                    <h2 className={styles.loginTitle}>Welcome Back</h2>
                    <form id="loginForm" onSubmit={handleSubmit}>
                        <div className={styles.inputGroup}>
                            <input className={styles.loginInput} type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className={styles.inputGroup}>
                            <input className={styles.loginInput} type="password" placeholder="Password" id="loginPassword" name="password" required value={password} onChange={(e) => { setPassword(e.target.value); showLiveValidation(e.target.value); }} />
                            <span id="loginMessage" className={styles.error}>
                                {loginMessage}
                            </span>
                        </div>
                        <button type="submit" className={styles.loginButton}>Sign In</button>
                        <button className={styles.googleBtn} type="button">
                            <img
                                src="https://www.svgrepo.com/show/355037/google.svg"
                                alt="Google Logo"
                            />
                            Continue with Google
                        </button>
                        <div className={styles.toggleForm}>
                            Don't have an account? <a href="/signup">Create One</a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
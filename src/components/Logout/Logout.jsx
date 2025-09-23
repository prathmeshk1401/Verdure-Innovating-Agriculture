import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Logout.module.css";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = () => {
            // Clear all stored data
            localStorage.removeItem("verdure_token");
            localStorage.removeItem("user");
            localStorage.removeItem("token"); // Clear old token key too
            
            // Show logout message
            console.log("User logged out successfully");
            
            // Redirect to login page after a short delay
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        };

        handleLogout();
    }, [navigate]);

    return (
        <div className={styles.logoutContainer}>
            <div className={styles.logoutMessage}>
                <h2>👋 Logging out...</h2>
                <p>You have been successfully logged out.</p>
                <div className={styles.spinner}></div>
            </div>
        </div>
    );
};

export default Logout;

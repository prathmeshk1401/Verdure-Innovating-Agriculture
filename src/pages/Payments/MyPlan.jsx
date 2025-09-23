// src/pages/MyPlan.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UpgradePlan from "./UpgradePlan"
import styles from "./MyPlan.module.css";

const MyPlan = () => {
    // Later this can come from backend / user profile API
    const [currentPlan, setCurrentPlan] = useState({
        name: "Basic",
        price: "₹0/month",
        features: [
            "Access to crop data",
            "Basic analytics",
            "Community support",
            "Limited weather insights",
        ],
        renewalDate: "2025-10-15",
    });

    const navigate = useNavigate();
    return (
        <div className={styles['myplan-container']}>
            <header className={styles['myplan-header']}>
                <h2>My Current Plan</h2>
                <p>Here’s the subscription you are currently on</p>
            </header>

            <div className={styles['plan-details']}>
                <h3>{currentPlan.name}</h3>
                <p className={styles['plan-price']}>{currentPlan.price}</p>

                <h4>Features Included:</h4>
                <ul className={styles['plan-features']}>
                    {currentPlan.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>

                <p className={styles['renewal-info']}>
                    <strong>Next Renewal Date:</strong> {currentPlan.renewalDate}
                </p>
            </div>

            <div className={styles['plan-actions']}>
                <button
                    className={styles['change-btn']}
                    onClick={() => navigate('/UpgradePlan')}
                >
                    Change Plan
                </button>
                <button className={styles['cancel-btn']}>Cancel Subscription</button>
            </div>

            <button
                className={styles['lastButton']}
                onClick={() => navigate('/UpgradePlan')}
            >
                Upgrade Plan
            </button>
        </div>
    );
};

export default MyPlan;

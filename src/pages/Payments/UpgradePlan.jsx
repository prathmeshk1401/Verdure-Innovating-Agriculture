// src/pages/Payments.jsx
import React, { useState } from "react";
import styles from "../Payments/Payments.module.css";

const UpgradePlan = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);

    const plans = [
        {
            id: 1,
            name: "Basic Plan",
            price: "₹0",
            features: [
                "Access to crop data",
                "Basic analytics",
                "Community support",
                "Limited weather insights"
            ],
        },
        {
            id: 2,
            name: "Pro Plan",
            price: "₹499/month",
            features: [
                "All Basic features",
                "Advanced analytics",
                "Weather integration",
                "Priority support",
            ],
        },
        {
            id: 3,
            name: "Enterprise Plan",
            price: "₹999/month",
            features: [
                "All Pro features",
                "Dedicated account manager",
                "Custom dashboards",
                "24/7 support",
                "AI support"
            ],
        },
    ];

    const handleSubscribe = (plan) => {
        setSelectedPlan(plan);
        alert(`You selected the ${plan.name}`);
        // Later: Integrate payment gateway here
    };

    return (
        <div className={styles['payments-container']}>
            <header className={styles['payments-header']}>
                <h2>Subscription Plans</h2>
                <p>Choose the best plan for your farming needs</p>
            </header>

            <div className={styles['plans-container']}>
                {plans.map((plan) => (
                    <div key={plan.id} className={styles['plan-card']}>
                        <h3>{plan.name}</h3>
                        <p className={styles['plan-price']}>{plan.price}</p>
                        <ul className={styles['plan-features']}>
                            {plan.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                        <button
                            className={styles['subscribe-btn']}
                            onClick={() => handleSubscribe(plan)}
                        >
                            Subscribe
                        </button>
                    </div>
                ))}
            </div>

            {selectedPlan && (
                <div className={styles['selected-plan']}>
                    <h4>Current Selection:</h4>
                    <p>
                        <strong>{selectedPlan.name}</strong> - {selectedPlan.price}
                    </p>
                </div>
            )}
        </div>
    );
};

export default UpgradePlan;

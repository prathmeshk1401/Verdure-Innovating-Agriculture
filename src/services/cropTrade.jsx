import React from "react";
import "../assets/styles/GlobalPages.css";
import Loader from "../components/Loader";
import { useState, useEffect } from "react";

const features = [
    {
        title: "✔ Sell & Buy Crops",
        desc: "List harvest for sale or purchase directly from verified farmers.",
    },
    {
        title: "✔ Pricing & Market Trends",
        desc: "Track real-time crop prices and demand insights to make better decisions.",
    },
    {
        title: "✔ Verified Farmers & Buyers",
        desc: "Trustworthy transactions through a secure verification system.",
    },
    {
        title: "✔ Secure Payment System",
        desc: "Conduct safe transactions with integrated payment options.",
    },
    {
        title: "✔ Delivery & Logistics Support",
        desc: "Access transportation assistance to move crops efficiently.",
    },
    {
        title: "✔ Quality Assurance & Ratings",
        desc: "Buyers can rate sellers to build credibility and trust.",
    },
    {
        title: "✔ Auction & Bulk Selling Option",
        desc: "Enable competitive pricing and high-volume selling options.",
    },
    {
        title: "✔ Crop Catalog & Sorting",
        desc: "Search by crop type, season, region, or organic certification.",
    },
    {
        title: "✔ Community Discussions",
        desc: "Connect with other farmers to discuss strategies and trends.",
    },
];

function CropTrade() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Show loader only for first load
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500); // adjust timing
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="crop-tradeContainer">
            <header className="trade-header">
                <h1>Crop Trade</h1>
                <p>Your trusted digital marketplace for buying and selling crops</p>
            </header>
            <section className="tradeFeatures">
                <h2>Key Features for Crop Trade</h2>
                <div className="tradeGrid-container">
                    {features.map((feature, idx) => (
                        <div className="tradeFeature-card" key={idx}>
                            <h3>{feature.title}</h3>
                            <p>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default CropTrade;
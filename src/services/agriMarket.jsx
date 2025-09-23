import React from "react";
import "../assets/styles/GlobalPages.css";
import Loader from "../components/Loader";
import { useState, useEffect } from "react";

const AgriMarket = () => {
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
        <div className="agriMarket">
            {/* Basic structure update it when needed */}
            <header className="marketContainer">
                <h1>Agri Market</h1>
                <p>Connecting Farmers with Buyers for a Sustainable Future</p>
                <input type="text" placeholder="Search for crops or products..." className="search-bar" />
                <button>Search</button>
            </header>

            <section className="marketplace">
                <h2>Marketplace for Farming Essentials</h2>
                <div className="products">
                    <div className="product">
                        <h3>Organic Fertilizer</h3>
                        <p>Price: $20</p>
                        <button>Add to Cart</button>
                    </div>
                    <div className="product">
                        <h3>Seeds</h3>
                        <p>Price: $5</p>
                        <button>Add to Cart</button>
                    </div>
                    <div className="product">
                        <h3>Farming Tools</h3>
                        <p>Price: $30</p>
                        <button>Add to Cart</button>
                    </div>
                    {/* Add more products as needed */}
                </div>
            </section>

            <section className="price-trends">
                <h2>Price Trends & Market Insights</h2>
                <div className="charts">
                    <p>Dynamic charts showing real-time crop prices.</p>
                    <p>Expert commentary on market trends and advice.</p>
                </div>
            </section>

            <section className="farmer-profiles">
                <h2>Verified Farmer Profiles</h2>
                <div className="profiles">
                    <div className="profile">
                        <h3>Farmer Name</h3>
                        <p>Reputation: 4.5/5</p>
                        <p>Transactions: 100</p>
                        <button>View Reviews</button>
                    </div>
                    {/* Add more profiles as needed */}
                </div>
            </section>

            <section className="order-tracking">
                <h2>Order Tracking & Logistics</h2>
                <p>Track your crop deliveries and view transportation options.</p>
            </section>

            <section className="payment">
                <h2>Secure Payment Section</h2>
                <p>Payment Methods: UPI, Cards, Cash-on-Delivery, Escrow</p>
                <p>Your transactions are secure and protected.</p>
            </section>

            <section className="weather-forecast">
                <h2>Agro Weather Forecast</h2>
                <p>Live weather updates and future predictions.</p>
            </section>

            <section className="reviews">
                <h2>Community Reviews & Ratings</h2>
                <p>User reviews for crop sellers and products.</p>
            </section>

        </div>
    );
};

export default AgriMarket;

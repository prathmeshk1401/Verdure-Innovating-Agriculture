import React from "react";
import "../assets/styles/GlobalPages.css";

const FarmWisdom = () => (
    <section className="main-section">
        <div className="farmWisdomContainer">
            <h1>Farm Wisdom</h1>
            <input
                type="text"
                id="farmWisdomSearch-bar"
                className="farmWisdomSearch-bar"
                placeholder="Search for farming topics (e.g., 'drip irrigation')..."
            />
            <div className="farmWisdomGrid">
                {/* Innovative Techniques */}
                <div className="farmWisdomGrid-item">
                    <img src="farmingTech.jpg" alt="Farming Techniques" />
                    <h3>Innovative Techniques</h3>
                    <p>Explore modern farming methods to boost efficiency and yields.</p>
                </div>
                {/* Irrigation and Water Management */}
                <div className="farmWisdomGrid-item">
                    <div
                        className="grid-item-image"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1591453089846-0f3391d4a0dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
                        }}
                    ></div>
                    <h3>Irrigation and Water Management</h3>
                    <p>Learn water-saving techniques and optimized irrigation practices.</p>
                </div>
                {/* Pest and Disease Management */}
                <div className="farmWisdomGrid-item">
                    <div
                        className="grid-item-image"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1587135991058-8816d058ccc2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
                        }}
                    ></div>
                    <h3>Pest and Disease Management</h3>
                    <p>Identify and treat common pests and crop diseases effectively.</p>
                </div>
                {/* Sustainable Practices */}
                <div className="farmWisdomGrid-item">
                    <div
                        className="farmWisdomGrid-item-image"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
                        }}
                    ></div>
                    <h3>Sustainable Practices</h3>
                    <p>Adopt eco-friendly farming methods for long-term productivity.</p>
                </div>
                {/* Market and Post-Harvest Insights */}
                <div className="farmWisdomGrid-item">
                    <div
                        className="farmWisdomGrid-item-image"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
                        }}
                    ></div>
                    <h3>Market and Post-Harvest Insights</h3>
                    <p>Tips for storage, transportation, and market access.</p>
                </div>
                {/* Seasonal Guides */}
                <div className="farmWisdomGrid-item">
                    <div
                        className="farmWisdomGrid-item-image"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1573471560640-1aeb396e0e4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
                        }}
                    ></div>
                    <h3>Seasonal Guides</h3>
                    <p>Get actionable tips for seasonal farming preparations.</p>
                </div>
            </div>
        </div>
    </section>
);

export default FarmWisdom;

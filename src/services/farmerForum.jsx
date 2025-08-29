import React from "react";
import "../assets/styles/GlobalPages.css";
import teamIcon from "../assets/team.png";
import statsIcon from "../assets/stats (1).png";
import messagesIcon from "../assets/messages (1).png";
import onlineIcon from "../assets/chart-line-up (1).png";


const FarmerForum = () => (
    <div className="farmer-forum">
        <header>
            <h1>Verdure Farm Connect</h1>
            <p>Join our community of farmers sharing knowledge, experience, and support</p>
            <div className="button-container">
                <button>Start a Discussion</button>
                <button>Browse Topics</button>
            </div>
        </header>

        <main>
            <section className="forum-categories">
                <div className="forum-container">
                    <h2>Forum Categories</h2>
                    <div className="forum-grid">
                        <div className="category-box community">
                            <h3>👥 Community Discussions</h3>
                            <p>Connect with other farmers, share experiences, and discuss agricultural topics</p>
                            <small>842 topics &nbsp; 3219 posts</small>
                        </div>
                        <div className="category-box expert">
                            <h3>❓ Expert Q&amp;A</h3>
                            <p>Get answers from agricultural experts on your farming challenges</p>
                            <small>415 topics &nbsp; 1628 posts</small>
                        </div>
                        <div className="category-box cropcare">
                            <h3>🌿 CropCare Help</h3>
                            <p>Post about soil issues, pest problems, and plant diseases</p>
                            <small>367 topics &nbsp; 1542 posts</small>
                        </div>
                        <div className="category-box harvest">
                            <h3>🍃 Harvest Tips &amp; Techniques</h3>
                            <p>Best harvesting methods and seasonal transition strategies</p>
                            <small>263 topics &nbsp; 984 posts</small>
                        </div>
                        <div className="category-box weather">
                            <h3>🌤️ Agro Weather Updates</h3>
                            <p>Check live weather data for informed crop planning decisions</p>
                            <small>178 topics &nbsp; 695 posts</small>
                        </div>
                        <div className="category-box marketplace">
                            <h3>🛒 Marketplace &amp; Crop Trade</h3>
                            <p>Buy and sell crops, equipment, and organic farming products</p>
                            <small>529 topics &nbsp; 2347 posts</small>
                        </div>
                        <div className="category-box success">
                            <h3>🏅 Success Stories &amp; Testimonials</h3>
                            <p>Real-world examples of farmers benefiting from Verdure solutions</p>
                            <small>147 topics &nbsp; 456 posts</small>
                        </div>
                    </div>
                </div>
            </section>

            <section className="discussions">
                <div className="container">
                    <h2>Discussions</h2>
                    <div className="discussion-box">
                        <h3>Natural pest control for organic tomatoes?</h3>
                        <p>
                            I'm struggling with aphids on my organic tomato crops. Looking for natural remedies that won't compromise organic certification.
                        </p>
                        <span>Tags: Organic, Pest Control, Tomatoes</span>
                        <div className="info">
                            <span>Posted by: SarahFarmer</span>
                            <span>42 likes | 18 comments | 156 views</span>
                        </div>
                    </div>
                    <div className="discussion-box">
                        <h3>When to harvest winter wheat in Zone 6b?</h3>
                        <p>
                            With the unusual temperature patterns, I'm unsure about the optimal harvesting time. Any advice from Zone 6b farmers?
                        </p>
                        <span>Tags: Winter Wheat, Harvesting, Zone 6b</span>
                        <div className="info">
                            <span>Posted by: WheatGrower</span>
                            <span>28 likes | 24 comments | 203 views</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="forum-statistics">
                <div className="forum-statistics">
                    <h2>Forum Statistics</h2>
                    <div className="stats-box">
                        <div className="stat-card">
                            <div className="icon-wrap green-text">
                                <img src={teamIcon} className="icon" alt="icon" />
                            </div>
                            <div className="text-group">
                                <p className="label">Members</p>
                                <p className="value green-text">12,483</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="icon-wrap yellow-text">
                                <img src={statsIcon} className="icon" alt="icon" />
                            </div>
                            <div className="text-group">
                                <p className="label">Discussions</p>
                                <p className="value yellow-text">7,452</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="icon-wrap brown-text">
                                <img src={messagesIcon} className="icon" alt="icon" />                            </div>
                            <div className="text-group">
                                <p className="label">Total Posts</p>
                                <p className="value brown-text">29,875</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="icon-wrap blue-text">
                                <img src={onlineIcon} className="icon" alt="icon" />                            </div>
                            <div className="text-group">
                                <p className="label">Online Now</p>
                                <p className="value blue-text">342</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
);

export default FarmerForum;

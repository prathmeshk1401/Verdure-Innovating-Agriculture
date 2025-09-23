import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Forum.module.css";
import teamIcon from "../../assets/icons/team.png";
import statsIcon from "../../assets/icons/stats.png";
import messagesIcon from "../../assets/icons/messages (1).png";
import onlineIcon from "../../assets/icons/chart-line-up.png";
import Loader from "../../components/Loader/Loader";

const Forum = () => {
    const [forumData, setForumData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showNewPostModal, setShowNewPostModal] = useState(false);
    const [newPost, setNewPost] = useState({
        title: "",
        content: "",
        category: "community"
    });

    const token = localStorage.getItem("verdure_token");

    // Fetch forum data from API
    const fetchForumData = async () => {
        try {
            setLoading(true);
            const res = await axios.get("/api/forum", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setForumData(res.data);
        } catch (err) {
            setError("Failed to load forum data. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Handle creating a new post
    const handleCreatePost = async () => {
        try {
            if (!newPost.title || !newPost.content) return;

            await axios.post("/api/forum", newPost, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Refresh forum data
            await fetchForumData();
            setNewPost({ title: "", content: "", category: "community" });
            setShowNewPostModal(false);
        } catch (err) {
            setError("Failed to create post. Please try again.");
            console.error(err);
        }
    };

    useEffect(() => {
        fetchForumData();
    }, [token]);

    if (loading) return <Loader />;

    if (error) {
        return (
            <div className={styles["farmer-forum"]}>
                <div className="error-container">
                    <h3>❌ {error}</h3>
                    <button onClick={fetchForumData} className="btn btn-primary">
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    const stats = forumData?.stats || {};
    const categories = forumData?.categories || [];
    const recentPosts = forumData?.recentPosts || [];

    return (
        <div className={styles["farmer-forum"]}>
            <header>
                <h1>Verdure Farm Connect</h1>
                <p>Join our community of farmers sharing knowledge, experience, and support</p>
                <div className={styles["button-container"]}>
                    <button onClick={() => setShowNewPostModal(true)} className="btn btn-primary">
                        Start a Discussion
                    </button>
                    <button className="btn btn-secondary">Browse Topics</button>
                </div>
            </header>

            <main>
                <section className={styles["forum-categories"]}>
                    <div className={styles["forum-container"]}>
                        <h2>Forum Categories</h2>
                        <div className={styles["forum-grid"]}>
                            {categories.map((category) => (
                                <div key={category.id} className={styles["category-box"] + " " + styles[category.type]}>
                                    <h3>{category.icon} {category.name}</h3>
                                    <p>{category.description}</p>
                                    <small>{category.topics} topics &nbsp; {category.posts} posts</small>
                                </div>
                            ))}
                            <div className={styles["category-box"] + " " + styles.harvest}>
                                <h3>🍃 Harvest Tips &amp; Techniques</h3>
                                <p>Best harvesting methods and seasonal transition strategies</p>
                                <small>263 topics &nbsp; 984 posts</small>
                            </div>
                            <div className={styles["category-box"] + " " + styles.weather}>
                                <h3>🌤️ Agro Weather Updates</h3>
                                <p>Check live weather data for informed crop planning decisions</p>
                                <small>178 topics &nbsp; 695 posts</small>
                            </div>
                            <div className={styles["category-box"] + " " + styles.marketplace}>
                                <h3>🛒 Marketplace &amp; Crop Trade</h3>
                                <p>Buy and sell crops, equipment, and organic farming products</p>
                                <small>529 topics &nbsp; 2347 posts</small>
                            </div>
                            <div className={styles["category-box"] + " " + styles.success}>
                                <h3>🏅 Success Stories &amp; Testimonials</h3>
                                <p>Real-world examples of farmers benefiting from Verdure solutions</p>
                                <small>147 topics &nbsp; 456 posts</small>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.discussions}>
                    <div className={styles.container}>
                        <h2>Recent Discussions</h2>
                        {recentPosts.length > 0 ? (
                            recentPosts.map((post) => (
                                <div key={post.id} className={styles["discussion-box"]}>
                                    <h3>{post.title}</h3>
                                    <p>{post.content}</p>
                                    <span>Tags: {post.tags?.join(", ") || "General"}</span>
                                    <div className={styles.info}>
                                        <span>Posted by: {post.author}</span>
                                        <span>{post.likes} likes | {post.comments} comments | {post.views} views</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center">
                                <p>No discussions available. Start the conversation!</p>
                            </div>
                        )}
                    </div>
                </section>

                <section className={styles["farmer-vendor"]}>
                    <div className={styles.container}>
                        <h2>Connect with Vendors</h2>
                        <div className={styles["vendor-chat-list"]}>
                            <div className={styles["vendor-card"]}>
                                <h3>Green Harvest Supplies</h3>
                                <p>Specializes in organic produce procurement</p>
                                <button>Start Chat</button>
                            </div>
                            <div className={styles["vendor-card"]}>
                                <h3>AgroTrade Co.</h3>
                                <p>Buys grains and pulses at competitive rates</p>
                                <button>Start Chat</button>
                            </div>
                            <div className={styles["vendor-card"]}>
                                <h3>SpiceWorld Traders</h3>
                                <p>Looking for quality spices for export</p>
                                <button>Start Chat</button>
                            </div>
                        </div>

                        <div className={styles["vendor-chat-window"]}>
                            <h3>Chat Window</h3>
                            <div className={styles.messages}>
                                <div className={styles.message + " " + styles.received}>
                                    <p>Hello! I’m interested in your organic tomatoes.</p>
                                    <span>Vendor • 10:15 AM</span>
                                </div>
                                <div className={styles.message + " " + styles.sent}>
                                    <p>Hi! Yes, we have fresh stock available for immediate shipment.</p>
                                    <span>Farmer • 10:16 AM</span>
                                </div>
                            </div>
                            <div className={styles["chat-input"]}>
                                <input type="text" placeholder="Type your message..." />
                                <button>Send</button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles["forum-statistics"]}>
                    <div className={styles["forum-statistics"]}>
                        <h2>Forum Statistics</h2>
                        <div className={styles["stats-box"]}>
                            <div className={styles["stat-card"]}>
                                <div className={styles["icon-wrap"] + " " + styles["green-text"]}>
                                    <img src={teamIcon} className={styles.icon} alt="icon" />
                                </div>
                                <div className={styles["text-group"]}>
                                    <p className={styles.label}>Members</p>
                                    <p className={styles.value + " " + styles["green-text"]}>{stats.members || "0"}</p>
                                </div>
                            </div>
                            <div className={styles["stat-card"]}>
                                <div className={styles["icon-wrap"] + " " + styles["yellow-text"]}>
                                    <img src={statsIcon} className={styles.icon} alt="icon" />
                                </div>
                                <div className={styles["text-group"]}>
                                    <p className={styles.label}>Discussions</p>
                                    <p className={styles.value + " " + styles["yellow-text"]}>{stats.discussions || "0"}</p>
                                </div>
                            </div>
                            <div className={styles["stat-card"]}>
                                <div className={styles["icon-wrap"] + " " + styles["brown-text"]}>
                                    <img src={messagesIcon} className={styles.icon} alt="icon" />
                                </div>
                                <div className={styles["text-group"]}>
                                    <p className={styles.label}>Total Posts</p>
                                    <p className={styles.value + " " + styles["brown-text"]}>{stats.totalPosts || "0"}</p>
                                </div>
                            </div>
                            <div className={styles["stat-card"]}>
                                <div className={styles["icon-wrap"] + " " + styles["blue-text"]}>
                                    <img src={onlineIcon} className={styles.icon} alt="icon" />
                                </div>
                                <div className={styles["text-group"]}>
                                    <p className={styles.label}>Online Now</p>
                                    <p className={styles.value + " " + styles["blue-text"]}>{stats.onlineNow || "0"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Forum;

import React, { useState, useEffect } from "react";
import styles from "./News.module.css";
import API_BASE from "../../utils/apiBase";

const News = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                setError("");
                const response = await fetch(`${API_BASE}/api/news`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                setNews(data);
            } catch (error) {
                console.error("Error fetching news:", error);
                setError("Failed to load news. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className={styles.newsPage}>
            <h2 className={styles.title}>🌱 Latest Agricultural News & Updates</h2>

            {loading ? (
                <div className={styles.loading}>
                    <div className={styles.spinner}></div>
                    <p>Loading latest news...</p>
                </div>
            ) : error ? (
                <div className={styles.error}>
                    <p>❌ {error}</p>
                    <button onClick={() => window.location.reload()} className={styles.retryBtn}>
                        Try Again
                    </button>
                </div>
            ) : news.length === 0 ? (
                <div className={styles.noNews}>
                    <p>📰 No news available right now. Check back later!</p>
                </div>
            ) : (
                <div className={styles.newsContainer}>
                    <div className={styles.newsStats}>
                        <p>📊 {news.length} articles found</p>
                    </div>
                    <ul className={styles.newsList}>
                        {news.map((item) => (
                            <li key={item.id} className={styles.newsItem}>
                                <div className={styles.newsContent}>
                                    <h3 className={styles.newsHeading}>
                                        <a 
                                            href={item.link} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className={styles.newsLink}
                                        >
                                            {item.title}
                                        </a>
                                    </h3>
                                    {item.summary && (
                                        <p className={styles.newsSummary}>
                                            {item.summary.length > 200 
                                                ? `${item.summary.substring(0, 200)}...` 
                                                : item.summary
                                            }
                                        </p>
                                    )}
                                    <div className={styles.newsMeta}>
                                        <span className={styles.newsSource}>📰 {item.source}</span>
                                        {item.pubDate && (
                                            <span className={styles.newsDate}>
                                                📅 {new Date(item.pubDate).toLocaleDateString()}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default News;

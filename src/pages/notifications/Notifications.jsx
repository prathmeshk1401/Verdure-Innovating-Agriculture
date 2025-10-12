import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Notifications.module.css";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState("all");

    const token = localStorage.getItem("verdure_token");

    // Fetch notifications from API
    const fetchNotifications = async () => {
        try {
            setLoading(true);
            setError(""); // Clear previous errors
            const res = await axios.get("/api/notifications", {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Ensure notifications is always an array
            const data = Array.isArray(res.data) ? res.data : [];
            setNotifications(data);
        } catch (err) {
            setError("Failed to load notifications. Please try again.");
            console.error(err);
            setNotifications([]); // Reset to empty array on error
        } finally {
            setLoading(false);
        }
    };

    // Handle marking notification as read
    const handleMarkAsRead = async (notificationId) => {
        try {
            await axios.put(`/api/notifications/${notificationId}/read`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            await fetchNotifications();
        } catch (err) {
            setError("Failed to mark notification as read. Please try again.");
            console.error(err);
        }
    };

    // Handle deleting notification
    const handleDeleteNotification = async (notificationId) => {
        if (!window.confirm("Are you sure you want to delete this notification?")) return;

        try {
            await axios.delete(`/api/notifications/${notificationId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            await fetchNotifications();
        } catch (err) {
            setError("Failed to delete notification. Please try again.");
            console.error(err);
        }
    };

    // Safe filter function to ensure notifications is an array
    const safeFilter = (predicate) => {
        if (!Array.isArray(notifications)) {
            return [];
        }
        return notifications.filter(predicate);
    };

    // Filter notifications based on selected filter
    const getFilteredNotifications = () => {
        switch (filter) {
            case "unread":
                return safeFilter(notification => !notification.read);
            case "read":
                return safeFilter(notification => notification.read);
            default:
                return safeFilter(() => true); // Return all
        }
    };

    // Get unread count safely
    const getUnreadCount = () => {
        return safeFilter(n => !n.read).length;
    };

    // Get read count safely
    const getReadCount = () => {
        return safeFilter(n => n.read).length;
    };

    // Get total count safely
    const getTotalCount = () => {
        return Array.isArray(notifications) ? notifications.length : 0;
    };

    // Get notification icon based on type
    const getNotificationIcon = (type) => {
        switch (type) {
            case "plan":
                return "📋";
            case "payment":
                return "💳";
            case "security":
                return "🔒";
            case "update":
                return "🔔";
            case "alert":
                return "⚠️";
            case "success":
                return "✅";
            default:
                return "📢";
        }
    };

    useEffect(() => {
        if (token) {
            fetchNotifications();
        } else {
            setLoading(false);
            setError("No authentication token found. Please log in.");
        }
    }, [token]);

    if (loading) {
        return (
            <div className={styles["notifications-page"]}>
                <div className={styles["loading-container"]}>
                    <div className={styles["spinner"]}></div>
                    <p>Loading notifications...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles["notifications-page"]}>
                <div className={styles["error-container"]}>
                    <h3>❌ {error}</h3>
                    <button onClick={fetchNotifications} className={`${styles["btn"]} ${styles["btn-primary"]}`}>
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    const filteredNotifications = getFilteredNotifications();

    return (
        <div className={styles["notifications-page"]}>
            <header className={styles["notifications-header"]}>
                <h2>Account Notifications</h2>
                <p>Stay updated with your farming activities and account information</p>
            </header>

            {/* Filter Tabs */}
            <div className={styles["notification-filters"]}>
                <button
                    className={`${styles["filter-tab"]} ${filter === "all" ? styles.active : ""}`}
                    onClick={() => setFilter("all")}
                >
                    All ({getTotalCount()})
                </button>
                <button
                    className={`${styles["filter-tab"]} ${filter === "unread" ? styles.active : ""}`}
                    onClick={() => setFilter("unread")}
                >
                    Unread ({getUnreadCount()})
                </button>
                <button
                    className={`${styles["filter-tab"]} ${filter === "read" ? styles.active : ""}`}
                    onClick={() => setFilter("read")}
                >
                    Read ({getReadCount()})
                </button>
            </div>

            <div className={styles["notifications-list"]}>
                {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`${styles["notification-card"]} ${styles[notification.type]} ${notification.read ? styles.read : styles.unread}`}
                        >
                            <div className={styles["notification-icon"]}>
                                {getNotificationIcon(notification.type)}
                            </div>
                            <div className={styles["notification-content"]}>
                                <p className={styles["notification-message"]}>{notification.message}</p>
                                <div className={styles["notification-meta"]}>
                                    <span className={styles["notification-time"]}>
                                        {new Date(notification.createdAt).toLocaleString()}
                                    </span>
                                    <span className={styles["notification-type"]}>
                                        {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                                    </span>
                                </div>
                            </div>
                            <div className={styles["notification-actions"]}>
                                {!notification.read && (
                                    <button
                                        className={styles["mark-read-btn"]}
                                        onClick={() => handleMarkAsRead(notification.id)}
                                    >
                                        Mark as Read
                                    </button>
                                )}
                                <button
                                    className={styles["delete-btn"]}
                                    onClick={() => handleDeleteNotification(notification.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className={styles["no-notifications"]}>
                        <div className={styles["no-notifications-icon"]}>📭</div>
                        <h3>No notifications found</h3>
                        <p>
                            {filter === "all"
                                ? "You're all caught up! No new notifications."
                                : filter === "unread"
                                ? "No unread notifications."
                                : "No read notifications."}
                        </p>
                    </div>
                )}
            </div>

            {/* Quick Stats */}
            <div className={styles["notification-stats"]}>
                <div className={styles["stat-item"]}>
                    <span className={styles["stat-number"]}>{getUnreadCount()}</span>
                    <span className={styles["stat-label"]}>Unread</span>
                </div>
                <div className={styles["stat-item"]}>
                    <span className={styles["stat-number"]}>{getReadCount()}</span>
                    <span className={styles["stat-label"]}>Read</span>
                </div>
                <div className={styles["stat-item"]}>
                    <span className={styles["stat-number"]}>{getTotalCount()}</span>
                    <span className={styles["stat-label"]}>Total</span>
                </div>
            </div>
        </div>
    );
};

export default Notifications;

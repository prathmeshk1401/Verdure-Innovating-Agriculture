import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DisplayDate from "../../components/Date & Weather/displayDate";
import WeatherDisplay from "../../components/Date & Weather/displayWeather";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [dashboardData, setDashboardData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [lastUpdated, setLastUpdated] = useState(null);

    const token = localStorage.getItem("verdure_token");

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            // Clear all stored data
            localStorage.removeItem("verdure_token");
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            
            // Redirect to logout page
            navigate("/logout");
        }
    };

    const fetchDashboard = async () => {
        try {
            const res = await axios.get(`/api/dashboard`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDashboardData(res.data);
            setLastUpdated(res.data.lastUpdated);
        } catch (err) {
            setError("Failed to load dashboard data.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = () => {
        setLoading(true);
        fetchDashboard();
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));

        fetchDashboard();
    }, [token]);

    if (loading) return (
        <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Loading your farming dashboard...</p>
        </div>
    );
    
    if (error) return (
        <div className={styles.errorContainer}>
            <h3>❌ {error}</h3>
            <button onClick={() => window.location.reload()} className={styles.retryBtn}>
                Try Again
            </button>
        </div>
    );

    const stats = dashboardData.stats || {};
    const activities = dashboardData.activities || [];
    const weatherAlerts = dashboardData.weatherAlerts || [];
    const recommendations = dashboardData.recommendations || [];
    const upcomingTasks = dashboardData.upcomingTasks || [];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.heading}>
                    <h2>Welcome back, {user?.username || "Farmer"} 👋</h2>
                    <p>Date: <DisplayDate /></p>
                    <p className={styles.weatherP}>Weather: <WeatherDisplay city={user?.city || "Mumbai"} /></p>
                </div>
                {/* <div className={styles.lastUpdated}>
                    <p>Last updated: {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : 'Never'}</p>
                </div> */}
            </div>

            <div className={styles.gridContainer}>
                <div className={styles.statCard}>
                    <h3>🌱 Active Crops</h3>
                    <p className={styles.statValue}>{stats.crops || 0}</p>
                    <p className={styles.statSubtext}>Total: {stats.totalCrops || 0}</p>
                </div>
                <div className={styles.statCard}>
                    <h3>🌍 Soil Health</h3>
                    <p className={styles.statValue}>{stats.soilHealth || "N/A"}</p>
                    <p className={styles.statSubtext}>Current status</p>
                </div>
                <div className={styles.statCard}>
                    <h3>💰 Net Profit</h3>
                    <p className={styles.statValue}>{stats.netProfit || "₹0"}</p>
                    <p className={styles.statSubtext}>Margin: {stats.profitMargin || "0%"}</p>
                </div>
                <div className={styles.statCard}>
                    <h3>📊 Analytics</h3>
                    <p className={styles.statValue}>{stats.analytics || "No data"}</p>
                    <p className={styles.statSubtext}>Performance</p>
                </div>
            </div>

            <div className={styles.newContainer}>
                <div className={styles.weatherContainer}>
                    <h3>🌤️ Weather & Alerts</h3>
                    <ul>
                        {weatherAlerts.map((alert, index) => (
                            <li key={index}>{alert}</li>
                        ))}
                    </ul>
                </div>

                <div className={styles.activityContainer}>
                    <h3>📈 Recent Activity</h3>
                    <ul>
                        {activities.slice(0, 3).map((activity) => (
                            <li key={activity.id}>
                                <span className={styles.activityIcon}>
                                    {activity.type === 'crop' ? '🌱' : activity.type === 'system' ? '🎉' : '📊'}
                                </span>
                                {activity.text}
                                <span className={styles.activityTime}>
                                    {new Date(activity.time).toLocaleDateString()}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={styles.recommendContainer}>
                    <h3>🤖 Smart AI Recommendations</h3>
                    <ul>
                        {recommendations.map((rec, index) => (
                            <li key={index}>{rec}</li>
                        ))}
                    </ul>
                </div>

                <div className={styles.calendarContainer}>
                    <h3>📅 Upcoming Tasks</h3>
                    <ul>
                        {upcomingTasks.map((task) => (
                            <li key={task.id}>
                                <span className={styles.taskPriority} data-priority={task.priority}></span>
                                {task.text}
                                <span className={styles.taskDate}>
                                    {new Date(task.date).toLocaleDateString()}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className={styles.buttonContainer}>
                <button onClick={handleRefresh} className={styles.updateButton} disabled={loading}>
                    {loading ? "Refreshing..." : "Refresh Page"}
                </button>
                <button onClick={handleLogout} className={styles.logoutButton}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
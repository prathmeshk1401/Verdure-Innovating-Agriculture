import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../Analytics/Analytics.module.css";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Analytics = () => {
    const [analyticsData, setAnalyticsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedCrop, setSelectedCrop] = useState("all");
    const [timePeriod, setTimePeriod] = useState("monthly");

    const token = localStorage.getItem("verdure_token");

    // Fetch analytics data from API
    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            const res = await axios.get("/api/analytics/dashboard", {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    crop: selectedCrop,
                    period: timePeriod
                }
            });
            setAnalyticsData(res.data);
        } catch (err) {
            setError("Failed to load analytics data. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnalytics();
    }, [token, selectedCrop, timePeriod]);

    // Prepare chart data
    const prepareChartData = () => {
        if (!analyticsData || !analyticsData.chartData) {
            return {
                labels: [],
                datasets: []
            };
        }

        return {
            labels: analyticsData.chartData.labels || [],
            datasets: [
                {
                    label: "Revenue (₹)",
                    data: analyticsData.chartData.revenue || [],
                    borderColor: "#2c662d",
                    backgroundColor: "rgba(44, 102, 45, 0.2)",
                    tension: 0.4,
                },
                {
                    label: "Yield (kg)",
                    data: analyticsData.chartData.yield || [],
                    borderColor: "#28a745",
                    backgroundColor: "rgba(40, 167, 69, 0.2)",
                    tension: 0.4,
                }
            ],
        };
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: `${timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)} Performance` },
        },
        animation: {
            duration: 1500,
            easing: 'easeInOutCubic',
        },
        scales: {
            y: {
                beginAtZero: true,
            }
        }
    };

    if (loading) {
        return (
            <div className={styles["analytics-container"]}>
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Loading analytics data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles["analytics-container"]}>
                <div className="error-container">
                    <h3>❌ {error}</h3>
                    <button onClick={fetchAnalytics} className="btn btn-primary">
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    const metrics = analyticsData?.metrics || {};
    const chartData = prepareChartData();

    return (
        <div className={styles["analytics-container"]}>
            {/* Header */}
            <header className={styles["analytics-header"]}>
                <h2>Analytics Dashboard</h2>
                <p>Track and visualize your crop and revenue performance</p>
            </header>

            {/* Filters */}
            <div className={styles["analytics-filters"]}>
                <label>
                    Select Crop:
                    <select
                        className={styles["analytics-select"]}
                        value={selectedCrop}
                        onChange={(e) => setSelectedCrop(e.target.value)}
                    >
                        <option value="all">All Crops</option>
                        <option value="wheat">Wheat</option>
                        <option value="rice">Rice</option>
                        <option value="corn">Corn</option>
                        <option value="tomato">Tomato</option>
                    </select>
                </label>

                <label>
                    Time Period:
                    <select
                        className={styles["analytics-select"]}
                        value={timePeriod}
                        onChange={(e) => setTimePeriod(e.target.value)}
                    >
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                </label>
            </div>

            {/* Key Metrics */}
            <div className={styles["grid-container"]}>
                <div className={styles["metric-card"]}>
                    <h3>Total Yield</h3>
                    <p>{metrics.totalYield || "0 kg"}</p>
                </div>
                <div className={styles["metric-card"]}>
                    <h3>Total Revenue</h3>
                    <p>{metrics.totalRevenue || "₹0"}</p>
                </div>
                <div className={styles["metric-card"]}>
                    <h3>Average Growth Rate</h3>
                    <p>{metrics.growthRate || "0%"}</p>
                </div>
                <div className={styles["metric-card"]}>
                    <h3>Profit Margin</h3>
                    <p>{metrics.profitMargin || "0%"}</p>
                </div>
            </div>

            {/* Chart */}
            <div className={styles["analytics-chart"]}>
                <h3>Performance Chart</h3>
                <div className={styles["graph"]}>
                    {chartData.labels.length > 0 ? (
                        <Line data={chartData} options={chartOptions} />
                    ) : (
                        <div className="text-center">
                            <p>No data available for the selected period and crop.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Additional Analytics */}
            {analyticsData?.insights && (
                <div className={styles["analytics-insights"]}>
                    <h3>AI Insights</h3>
                    <ul>
                        {analyticsData.insights.map((insight, index) => (
                            <li key={index}>{insight}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Analytics;

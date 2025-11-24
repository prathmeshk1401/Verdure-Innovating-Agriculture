import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ExportCrops.module.css";

export default function ExportCrops() {
    const [cropData, setCropData] = useState([]);
    const [successStories, setSuccessStories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("verdure_token");
                const headers = token ? { Authorization: `Bearer ${token}` } : {};

                const [cropsRes, storiesRes] = await Promise.all([
                    axios.get("/api/crops", { headers }),
                    axios.get("/api/success-stories", { headers })
                ]);

                console.log("Crops API Response:", cropsRes.data);
                console.log("Stories API Response:", storiesRes.data);

                // Handle API array validation
                const cropsResult = cropsRes.data?.data || cropsRes.data;
                const storiesResult = storiesRes.data?.data || storiesRes.data;

                setCropData(Array.isArray(cropsResult) ? cropsResult : []);
                setSuccessStories(Array.isArray(storiesResult) ? storiesResult : []);

            } catch (err) {
                console.error("Export page API error:", err);
                setCropData([]);
                setSuccessStories([]);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={styles.container}>

            {/* Section 1: How to Start */}
            <section className={styles.section}>
                <h2 className={styles.heading}>🌱 How to Start Exporting</h2>
                <ul className={styles.list}>
                    <li>Register your farm or business</li>
                    <li>Open a current bank account</li>
                    <li>Get PAN & IEC code from DGFT</li>
                    <li>Apply for APEDA registration</li>
                    <li>Choose export-grade crops</li>
                </ul>
            </section>

            {/* Recommended Crops */}
            <section className={styles.section}>
                <h2 className={styles.heading}>🌾 Recommended Crops</h2>

                {cropData.length === 0 ? (
                    <p>No crop data available.</p>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Crop</th>
                                <th>Export Price (₹/kg)</th>
                                <th>Expenses (₹/kg)</th>
                                <th>Total Income (₹)</th>
                                <th>Profit Margin (%)</th>
                                <th>Profit Income (₹)</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cropData.map((crop, index) => (
                                <tr key={index}>
                                    <td>{crop.name}</td>
                                    <td>₹{crop.exportPrice}</td>
                                    <td>₹{crop.expenses}</td>
                                    <td>₹{crop.totalIncome?.toLocaleString()}</td>
                                    <td>{crop.profitMargin}%</td>
                                    <td>₹{crop.profitIncome?.toLocaleString()}</td>
                                    <td>
                                        <a
                                            href={crop.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.link}
                                        >
                                            View
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>

            {/* Success Stories */}
            <section className={styles.section}>
                <h2 className={styles.heading}>👨‍🌾 Farmer Success Stories</h2>

                {successStories.length === 0 ? (
                    <p>No success stories yet.</p>
                ) : (
                    <div className={styles.cardGrid}>
                        {successStories.map((farmer, index) => (
                            <div key={index} className={styles.card}>
                                <h3 className={styles.cardTitle}>{farmer.name}</h3>
                                <p>📍 {farmer.location}</p>
                                <p>🌾 Crop: {farmer.crop}</p>
                                <p>💰 Revenue: ₹{farmer.revenue?.toLocaleString()}</p>
                                <blockquote className={styles.quote}>
                                    “{farmer.testimonial}”
                                </blockquote>
                            </div>
                        ))}
                    </div>
                )}
            </section>

        </div>
    );
}

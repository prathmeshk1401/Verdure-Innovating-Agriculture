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
                
                setCropData(cropsRes.data || []);
                setSuccessStories(storiesRes.data || []);
            } catch (err) {
                console.error("Failed to fetch export data:", err);
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
                    <li>✅ Register your farm or business</li>
                    <li>✅ Open a current bank account</li>
                    <li>✅ Get PAN & IEC code from DGFT</li>
                    <li>✅ Apply for APEDA registration</li>
                    <li>✅ Choose export-grade crops</li>
                </ul>
                <p className={styles.linkText}>
                    📘 Download the official guidebook:{" "}
                    <a
                        href="https://farmerconnect.apeda.gov.in/Content/APEDA_Agri_Export_Manual_FINAL.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                    >
                        APEDA Agri Export Manual
                    </a>
                </p>
            </section>

            {/* Section 2: Step-by-Step Process */}
            <section className={styles.section}>
                <h2 className={styles.heading}>🛠️ Export Process</h2>
                <ol className={styles.orderedList}>
                    <li>Business Setup (PAN, IEC)</li>
                    <li>APEDA Registration</li>
                    <li>Crop Selection & Planning</li>
                    <li>Quality Control & Certification</li>
                    <li>Packaging & Logistics</li>
                    <li>Customs Clearance</li>
                    <li>Revenue Distribution (if collaborative)</li>
                </ol>
            </section>

            {/* Section 3: Recommended Crops */}
            <section className={styles.section}>
                <h2 className={styles.heading}>🌾 Recommended Crops</h2>
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
                                <td>₹{crop.totalIncome.toLocaleString()}</td>
                                <td>{crop.profitMargin}%</td>
                                <td>₹{crop.profitIncome.toLocaleString()}</td>
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
            </section>

            {/* Section 4: Success Stories */}
            <section className={styles.section}>
                <h2 className={styles.heading}>👨‍🌾 Farmer Success Stories</h2>
                <div className={styles.cardGrid}>
                    {successStories.map((farmer, index) => (
                        <div key={index} className={styles.card}>
                            <h3 className={styles.cardTitle}>{farmer.name}</h3>
                            <p>📍 {farmer.location}</p>
                            <p>🌾 Crop: {farmer.crop}</p>
                            <p>💰 Revenue: ₹{farmer.revenue.toLocaleString()}</p>
                            <blockquote className={styles.quote}>
                                “{farmer.testimonial}”
                            </blockquote>
                        </div>
                    ))}
                </div>
            </section>

            {/* Section 5: Helpful Resources */}
            <section className={styles.section}>
                <h2 className={styles.heading}>🔗 Helpful Resources</h2>
                <ul className={styles.list}>
                    <li>
                        <a
                            href="https://apeda.gov.in/apedawebsite/index.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.link}
                        >
                            APEDA Registration Portal
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://dgft.gov.in/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.link}
                        >
                            DGFT IEC Code Application
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://pmfby.gov.in/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.link}
                        >
                            PMFBY Crop Insurance
                        </a>
                    </li>
                </ul>
            </section>
        </div>
    );
}

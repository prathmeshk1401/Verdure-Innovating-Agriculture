import React, { useState, useEffect } from "react";
import styles from "./SoilTesting.module.css";

const SoilTesting = () => {
    const [form, setForm] = useState({ ph: "", n: "", p: "", k: "" });
    const [report, setReport] = useState("");
    const [showPDF, setShowPDF] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const generateReport = () => {
        const { ph, n, p, k } = form;
        const recommendation =
            ph < 6
                ? "Soil is acidic. Consider liming."
                : ph > 7.5
                ? "Soil is alkaline. Add organic matter."
                : "Soil pH is optimal.";

        const output = `
            <h3>Soil Test Report</h3>
            <p><strong>Soil pH Level:</strong> ${ph}</p>
            <p><strong>Nitrogen (N):</strong> ${n} ppm</p>
            <p><strong>Phosphorus (P):</strong> ${p} ppm</p>
            <p><strong>Potassium (K):</strong> ${k} ppm</p>
            <p><strong>Recommendation:</strong> ${recommendation}</p>
        `;
        setReport(output);
        setShowPDF(true);
    };

    const generatePDF = async () => {
        const { jsPDF } = await import("jspdf");
        const doc = new jsPDF();
        doc.text("Soil Test Report", 10, 10);
        doc.text(`Soil pH Level: ${form.ph}`, 10, 20);
        doc.text(`Nitrogen (N): ${form.n} ppm`, 10, 30);
        doc.text(`Phosphorus (P): ${form.p} ppm`, 10, 40);
        doc.text(`Potassium (K): ${form.k} ppm`, 10, 50);
        doc.save("SoilTestReport.pdf");
    };

    const bookSlot = () => {
        window.location.href = "/book-slot";
    };

    return (
        <div className={styles["cropCareContainer"]}>
            <div className={styles["cropCareHeader"]}>
                <h1>CropCare Report</h1>
                <p>Empowering farmers with comprehensive insights into soil health and crop care.</p>
            </div>

            <div className={styles["cropCareGrid-container"]}>
                <div className={`${styles["cropCareGrid-box"]} ${styles.infoBox}`}>
                    <h2>Soil Analysis by Experts</h2>
                    <h3>Features</h3>
                    <ul className={styles["cropCareFeature-list"]}>
                        <li>Soil Condition Analysis</li>
                        <li>Pest Monitoring</li>
                        <li>Personalized Recommendations</li>
                    </ul>
                    <h3>Steps for Booking</h3>
                    <ul className={styles["cropCareSteps-list"]}>
                        <li>Book a Slot</li>
                        <li>Expert Visit</li>
                        <li>Lab Analysis</li>
                        <li>Receive Report</li>
                    </ul>
                    <button onClick={bookSlot}>Book Slot Now</button>
                </div>

                <div className={`${styles["cropCareGrid-box"]} ${styles.inputBox}`}>
                    <h2>Basic Soil Testing Kit</h2>
                    <form
                        id="soilTestForm"
                        onSubmit={(e) => {
                            e.preventDefault();
                            generateReport();
                        }}
                    >
                        <label>Soil pH Level:</label>
                        <input
                            type="number"
                            step="0.1"
                            name="ph"
                            value={form.ph}
                            onChange={handleChange}
                            required
                        />

                        <label>Nitrogen (N) Level (ppm):</label>
                        <input
                            type="number"
                            name="n"
                            value={form.n}
                            onChange={handleChange}
                            required
                        />

                        <label>Phosphorus (P) Level (ppm):</label>
                        <input
                            type="number"
                            name="p"
                            value={form.p}
                            onChange={handleChange}
                            required
                        />

                        <label>Potassium (K) Level (ppm):</label>
                        <input
                            type="number"
                            name="k"
                            value={form.k}
                            onChange={handleChange}
                            required
                        />

                        <button type="submit">Generate Report</button>
                    </form>

                    <div
                        id="reportOutput"
                        dangerouslySetInnerHTML={{ __html: report }}
                    ></div>
                    {showPDF && (
                        <button onClick={generatePDF} id="pdfButton">
                            Download Report as PDF
                        </button>
                    )}
                </div>
            </div>

            <div className={styles["cta-section"]}>
                <button onClick={bookSlot}>Book a Certified Soil Test Now</button>
            </div>
        </div>
    );
};

export default SoilTesting;

import React, { useState } from "react";
import "../assets/styles/GlobalPages.css";

const CropCareReport = () => {
    const [form, setForm] = useState({
        ph: "",
        n: "",
        p: "",
        k: "",
    });
    const [report, setReport] = useState("");
    const [showPDF, setShowPDF] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const generateReport = () => {
        const { ph, n, p, k } = form;
        let output = `<h3>Soil Test Report</h3>`;
        output += `<p><strong>Soil pH Level:</strong> ${ph}</p>`;
        output += `<p><strong>Nitrogen (N):</strong> ${n} ppm</p>`;
        output += `<p><strong>Phosphorus (P):</strong> ${p} ppm</p>`;
        output += `<p><strong>Potassium (K):</strong> ${k} ppm</p>`;
        output += `<p><strong>Recommendation:</strong> ${
            ph < 6
                ? "Soil is acidic. Consider liming."
                : ph > 7.5
                ? "Soil is alkaline. Add organic matter."
                : "Soil pH is optimal."
        }</p>`;
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

    // Menu toggle logic (for mobile)
    React.useEffect(() => {
        const toggle = document.getElementById("menuToggle");
        const menu = document.getElementById("horizontalMenu");
        if (toggle && menu) {
            toggle.onclick = () => {
                menu.classList.toggle("active");
            };
        }
    }, []);

    return (
        <div>
            <div className="cropCareHeader">
                <h1>CropCare Report</h1>
                <p>
                    Empowering farmers with comprehensive insights into soil health and
                    crop care.
                </p>
            </div>

            <div className="cropCareGrid-container">
                <div className="cropCareGrid-box">
                    <h2>Soil Analysis by Experts</h2>
                    <h3>Features</h3>
                    <ul className="cropCareFeature-list">
                        <li>Soil Condition Analysis</li>
                        <li>Pest Monitoring</li>
                        <li>Personalized Recommendations</li>
                    </ul>
                    <h3>Steps for Booking</h3>
                    <ul className="cropCareSteps-list">
                        <li>Book a Slot</li>
                        <li>Expert Visit</li>
                        <li>Lab Analysis</li>
                        <li>Receive Report</li>
                    </ul>
                    <button onClick={bookSlot}>Book Slot Now</button>
                </div>

                <div className="cropCareGrid-box">
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

            <div className="cta-section">
                <button onClick={bookSlot}>Book a Certified Soil Test Now</button>
            </div>
        </div>
    );
};

export default CropCareReport;
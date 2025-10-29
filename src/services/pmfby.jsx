import React, { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import styles from '../assets/styles/pmfby.module.css'; // Import the CSS module

const Pmfby = () => {
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState('');
    const [geotag, setGeotag] = useState({ lat: null, lng: null });
    const [analysisResult, setAnalysisResult] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const fileInputRef = useRef(null);

    // Handle image upload with geotagging
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            // Attempt to get geolocation
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setGeotag({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        });
                        setLocation(`${position.coords.latitude}, ${position.coords.longitude}`); // Auto-fill location
                    },
                    (error) => {
                        console.error('Geolocation error:', error);
                        alert('Geolocation failed. Please enter location manually.');
                    }
                );
            } else {
                alert('Geolocation not supported. Please enter location manually.');
            }
        }
    };

    // Mock AI analysis (simulate damage detection)
    const runMockAnalysis = () => {
        if (!image) {
            alert('Please upload an image first.');
            return;
        }
        // Simulate AI processing (random damage for demo)
        const damagePercent = Math.floor(Math.random() * 101);
        const recommendations = damagePercent > 50
            ? 'High damage detected. Recommend immediate insurance claim and crop replacement.'
            : 'Low damage. Monitor crops closely.';
        setAnalysisResult({ damagePercent, recommendations });
        setPopupMessage('AI Analysis Complete!');
        setShowPopup(true);
    };

    // Generate PDF report
    const generatePDF = () => {
        if (!analysisResult) {
            alert('Please run analysis first.');
            return;
        }
        const doc = new jsPDF();
        doc.text('PMFBY Crop Damage Report', 20, 20);
        doc.text(`Location: ${location}`, 20, 40);
        doc.text(`Geotag: Lat ${geotag.lat}, Lng ${geotag.lng}`, 20, 50);
        doc.text(`Damage Percentage: ${analysisResult.damagePercent}%`, 20, 60);
        doc.text(`Recommendations: ${analysisResult.recommendations}`, 20, 70);
        doc.save('PMFBY_Report.pdf');
        setPopupMessage('PDF Report Generated and Downloaded!');
        setShowPopup(true);
    };

    // Close popup
    const closePopup = () => setShowPopup(false);

    return (
        <div className={styles.container}>
            {/* Header */}
            <header className={styles.header}>
                <h1>PMFBY Crop Insurance Portal</h1>
                <p>Upload, Analyze, and Report Crop Damages</p>
            </header>

            {/* Main Grid Layout */}
            <div className={styles.gridContainer}>
                {/* Feature 1: Image Upload */}
                <div className={styles.card}>
                    <h2>Upload Crop Image</h2>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        className={styles.fileInput}
                    />
                    {image && (
                        <div className={styles.imagePreview}>
                            <img src={image} alt="Uploaded Crop" />
                        </div>
                    )}
                </div>

                {/* Feature 2: Location Input */}
                <div className={styles.card}>
                    <h2>Location (Optional)</h2>
                    <input
                        type="text"
                        placeholder="Enter location or use geotag"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className={styles.input}
                    />
                    <p className={styles.textSmall}>
                        Geotag: {geotag.lat ? `Lat: ${geotag.lat}, Lng: ${geotag.lng}` : 'Not available'}
                    </p>
                </div>

                {/* Feature 3: AI Analysis */}
                <div className={styles.card}>
                    <h2>AI Damage Analysis</h2>
                    <button
                        onClick={runMockAnalysis}
                        className={`${styles.button} ${styles.buttonPrimary}`}
                    >
                        Run Analysis
                    </button>
                    {analysisResult && (
                        <div className={styles.analysisResult}>
                            <p><strong>Damage:</strong> {analysisResult.damagePercent}%</p>
                            <p><strong>Recommendations:</strong> {analysisResult.recommendations}</p>
                        </div>
                    )}
                </div>

                {/* Feature 4: Generate PDF */}
                <div className={`${styles.card} ${styles.spanTwo}`}>
                    <h2>Generate Report</h2>
                    <button
                        onClick={generatePDF}
                        className={`${styles.button} ${styles.buttonSecondary}`}
                    >
                        Download PDF Report
                    </button>
                </div>

                {/* Feature 5: Additional Info or Placeholder */}
                <div className={styles.card}>
                    <h2>Help & Support</h2>
                    <p className={styles.textSmall}>
                        For PMFBY claims, ensure accurate uploads. Contact support for real AI analysis.
                    </p>
                </div>
            </div>

            {/* Confirmation Popup */}
            {showPopup && (
                <div className={styles.popupOverlay}>
                    <div className={styles.popup}>
                        <h3>Confirmation</h3>
                        <p>{popupMessage}</p>
                        <button
                            onClick={closePopup}
                            className={`${styles.button} ${styles.buttonConfirm}`}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Pmfby;

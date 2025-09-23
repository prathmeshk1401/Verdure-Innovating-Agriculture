import React, { useState, useEffect } from "react";
import "../assets/styles/GlobalPages.css";
import Loader from "../components/Loader";

const DiseaseDetect = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchDataFromAPI(); // example
    }, []);

    const fetchDataFromAPI = async () => {
        setLoading(true);
        // simulate API call
        setTimeout(() => {
            setData("Result from API");
            setLoading(false);
        }, 2000);
    };

    if (loading) return <Loader />;


    return (
        <div className="diseaseContainer">
            {/* Left Box */}
            <div className="disease-left-box">
                <div className="diseaseHeader">
                    <i className="fi fi-sr-microscope"></i>
                    <h1>Disease Detection</h1>
                </div>

                <div className="disease-upload-area">
                    <i className="fas fa-cloud-upload-alt upload-icon"></i>
                    <p>Click to upload or drag and drop</p>
                    <p>PNG, JPG, JPEG up to 100MB</p>
                </div>

                <button className="disease-analyze-btn">Analyze Details</button>

                <div className="disease-steps">
                    <h3>Tips For Better Results</h3>
                    <ul>
                        <li>Capture clear photo of affected area.</li>
                        <li>Upload image using button above.</li>
                        <li>Click analyze to start detection.</li>
                        <li>View results and recommendations.</li>
                    </ul>
                </div>
            </div>

            {/* Right Box */}
            <div className="disease-right-box">
                <h1>Detection Results</h1>
                <div className="disease-result-placeholder">
                    <i className="fi fi-sr-exclamation"></i>
                    <p>No image analyzed yet</p>
                    <p>Upload your crop photo to analyze disease</p>
                </div>
            </div>
        </div>
    );
}

export default DiseaseDetect;

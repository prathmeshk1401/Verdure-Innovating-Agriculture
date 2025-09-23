import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../assets/styles/GlobalPages.css";
import Loader from "../components/Loader"; 

const menuItems = [
    { label: "Harvesting Tips", section: "harvesting" },
    { label: "Overview", section: "overview" },
    { label: "Soil Optimization", section: "soil" },
    { label: "Common Issues", section: "issues" },
];

const CropDetails = () => {
    const { crop } = useParams();
    const [activeSection, setActiveSection] = useState("harvesting");
    const [wikiData, setWikiData] = useState(null);
    const cropTitle = crop ? crop.charAt(0).toUpperCase() + crop.slice(1) : "Crop Name";
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Show loader only for first load
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500); // adjust timing
        return () => clearTimeout(timer);
    }, []);

    
    useEffect(() => {
        if (crop) {
            fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${crop}`)
                .then(res => res.json())
                .then(data => setWikiData(data));
        }
    }, [crop]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="harvestHintsNextContainer">
            <button className="back-button" onClick={() => window.history.back()}>
                <i className="fas fa-arrow-left"></i> Back
            </button>
            <h1 id="crop-title">{cropTitle}</h1>
            <p className="subtitle">Detailed information about the selected crop</p>
            <div className="harvestHintsMenu-strip">
                {menuItems.map(item => (
                    <button
                        key={item.section}
                        className={`menu-button${activeSection === item.section ? " active" : ""}`}
                        onClick={() => setActiveSection(item.section)}
                        data-section={item.section}
                        id={item.section === "overview" ? "overview" : undefined}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
            <div className="content-section" id="content-display">
                {wikiData ? (
                    <div className="card">
                        <h2>{wikiData.title}</h2>
                        <img
                            src={wikiData.thumbnail ? wikiData.thumbnail.source : "default.jpg"}
                            alt={wikiData.title}
                            style={{ maxWidth: "200px", marginBottom: "1rem" }}
                        />
                        <p>{wikiData.extract}</p>
                        <a href={wikiData.content_urls?.desktop?.page} target="_blank" rel="noopener noreferrer">
                            Learn More
                        </a>
                    </div>
                ) : (
                    <p>Loading crop details...</p>
                )}
            </div>
        </div>
    );
};

export default CropDetails;

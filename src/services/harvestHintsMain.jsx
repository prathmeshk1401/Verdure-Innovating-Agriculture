import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/GlobalPages.css";
import wheatImg from "../assets/wheat.jpg";
import riceImg from "../assets/rice.jpg";
import cottonImg from "../assets/cotton.jpg";

const crops = [
    {
        name: "Wheat",
        img: wheatImg,
        alt: "Wheat",
        desc: "Information about wheat cultivation and harvesting",
        route: "/harvest-hints/wheat",
    },
    {
        name: "Rice",
        img: riceImg,
        alt: "Rice",
        desc: "Information about rice cultivation and harvesting",
        route: "/harvest-hints/rice",
    },
    {
        name: "Cotton",
        img: cottonImg,
        alt: "Cotton",
        desc: "Information about cotton cultivation and harvesting",
        route: "/harvest-hints/cotton",
    },
];

export default function HarvestHintsMain() {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const filteredCrops = crops.filter((crop) =>
        crop.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="harvestHintsContainer">
            <header className="harvestHintsHeader">
                <h1>Harvest Hints</h1>
                <p className="harvestHintsSubtitle">
                    Get agricultural intelligence on crop management, soil optimization, and ideal harvesting techniques for your crops
                </p>
                <div className="harvestHinsSearch-container">
                    <input
                        type="text"
                        placeholder="Search for crops (e.g., wheat, rice, cotton...)"
                        className="harvestHintsSearch-bar"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <i className="fas fa-search search-icon" id="search-icon"></i>
                    {search && (
                        <ul className="search-results">
                            {filteredCrops.length ? (
                                filteredCrops.map((crop) => (
                                    <li key={crop.name}>{crop.name}</li>
                                ))
                            ) : (
                                <li>No results found</li>
                            )}
                        </ul>
                    )}
                </div>
            </header>

            <div className="harvestHintsGrid-container">
                {filteredCrops.map((crop) => (
                    <div
                        className="crop-card"
                        key={crop.name}
                        data-crop={crop.name.toLowerCase()}
                        onClick={() => navigate(crop.route)}
                        style={{ cursor: "pointer" }}
                    >
                        <img src={crop.img} alt={crop.alt} />
                        <h3>{crop.name}</h3>
                        <p>{crop.desc}</p>
                    </div>
                ))}
            </div>

            <div className="info-box">
                <i className="fas fa-exclamation-circle"></i>
                <p>Harvest Hints provides expert agricultural advice for optimal crop yield and quality</p>
            </div>
        </div>
    );
}

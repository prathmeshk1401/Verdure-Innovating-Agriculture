// src/components/Loader.jsx
import React from "react";
import "./Loader.css"; // optional CSS file for styling

const Loader = () => (
    <div className="loader-container">
        <div className="loader"></div>
        <div>🚜 Booting up Verdure Intelligence...</div>
    </div>
);

export default Loader;

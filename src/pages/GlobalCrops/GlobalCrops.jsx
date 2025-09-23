import React, { useState } from "react";
import styles from "./GlobalCrops.module.css";

const crops = [
    { name: "Quinoa", key: "quinoa", description: "Learn about cultivating quinoa, optimal growing conditions, and harvesting tips." },
    { name: "Kiwi", key: "kiwi", description: "Learn about cultivating kiwi, optimal growing conditions, and harvesting tips." },
    { name: "Almond", key: "almond", description: "Learn about cultivating almonds, optimal growing conditions, and harvesting tips." },
];

const menuOptions = [
    { key: "cultivation", label: "Cultivation Guide" },
    { key: "soil", label: "Soil Testing" },
    { key: "expert", label: "Expert Advice" },
    { key: "harvest", label: "Harvesting Tips" },
    { key: "issues", label: "Common Issues" },
];

const cropContent = {
    cultivation: (crop) => (
        <>
            <h2>Cultivation Guide for <span className={styles["crop-name"]}>{crop}</span></h2>
            <p>Learn about the optimal growing conditions, planting methods, and care instructions for <span className={styles["crop-name"]}>{crop}</span>.</p>
        </>
    ),
    soil: (crop) => (
        <>
            <h2>Soil Testing for <span className={styles["crop-name"]}>{crop}</span></h2>
            <p>Understand the specific soil requirements for <span className={styles["crop-name"]}>{crop}</span> and how to perform soil tests to ensure ideal conditions.</p>
        </>
    ),
    expert: (crop) => (
        <>
            <h2>Expert Advice for <span className={styles["crop-name"]}>{crop}</span></h2>
            <p>Get personalized recommendations and tips from agricultural experts on growing <span className={styles["crop-name"]}>{crop}</span>.</p>
        </>
    ),
    harvest: (crop) => (
        <>
            <h2>Harvesting Tips for <span className={styles["crop-name"]}>{crop}</span></h2>
            <p>Learn the best practices for harvesting <span className={styles["crop-name"]}>{crop}</span> to ensure maximum yield and quality.</p>
        </>
    ),
    issues: (crop) => (
        <>
            <h2>Common Issues with <span className={styles["crop-name"]}>{crop}</span></h2>
            <p>Identify and address common issues and challenges faced while growing <span className={styles["crop-name"]}>{crop}</span>.</p>
        </>
    ),
};

export default function GlobalCrops() {
    const [search, setSearch] = useState("");
    const [selectedCrop, setSelectedCrop] = useState(null);
    const [activeMenu, setActiveMenu] = useState("cultivation");

    const filteredCrops = crops.filter((crop) =>
        crop.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className={styles["newCropHarvestContainer"]}>
            <div className={styles["newCropHarvestMain-content"]}>
                {!selectedCrop ? (
                    <div id="newCropHarvestMain-page">
                        <header className={styles["newCropHarvestHeader"]}>
                            <h1>New Crop Harvest</h1>
                            <p className={styles["newCropHarvestSubtitle"]}>
                                Empower farmers to cultivate imported crops with personalized soil
                                testing, expert advice, and step-by-step guides, ensuring optimal
                                growth and increased income.
                            </p>
                        </header>

                        <div className={styles["newCropHarvestSearch-container"]}>
                            <input
                                type="text"
                                placeholder="Search for new crops (e.g., quinoa, kiwi, almond...)"
                                id="newCropHarvestSearch-input"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <div className={styles["newCropHarvestGrid-container"]}>
                            {filteredCrops.map((crop) => (
                                <div
                                    className={styles["newCropHarvestGrid-item"]}
                                    key={crop.key}
                                    data-crop={crop.key}
                                    onClick={() => setSelectedCrop(crop)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <div className={`${styles["crop-image"]} ${styles[crop.key]}`}></div>
                                    <h3>{crop.name}</h3>
                                    <p>{crop.description}</p>
                                </div>
                            ))}
                        </div>

                        <div className={styles["newCropHarvestInfo-box"]}>
                            <i className="fi fi-rr-exclamation"></i>
                            <p>
                                New Crop Harvest: Discover how to successfully cultivate imported
                                crops and diversify your farming practices for increased income.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className={styles["newCropHarvestCropSpecificPage"]} id="cropPage">
                        <header className={styles.cropHeader}>
                            <button
                                id="back-button"
                                onClick={() => {
                                    setSelectedCrop(null);
                                    setActiveMenu("cultivation");
                                }}
                            >
                                <i className="fi fi-br-angle-small-left" id="back-button"></i>
                            </button>
                            <h1 className={styles["newCropHarvestCrop-title"]}>{selectedCrop.name}</h1>
                            <p className={styles["newCropHarvestSubtitle"]}>
                                Explore expert advice and step-by-step guides for cultivating{" "}
                                <span className={styles["crop-name"]}>{selectedCrop.name}</span>.
                            </p>
                        </header>

                        <div className={styles["newCropHarvestMenu-strip"]}>
                            {menuOptions.map((option) => (
                                <div
                                    key={option.key}
                                    className={`${styles["menu-option"]} ${activeMenu === option.key ? styles.active : ""}`}
                                    data-content={option.key}
                                    onClick={() => setActiveMenu(option.key)}
                                    style={{ cursor: "pointer" }}
                                >
                                    {option.label}
                                </div>
                            ))}
                        </div>

                        <div className={styles["newCropHarvestContent-box"]} id={activeMenu}>
                            {cropContent[activeMenu](selectedCrop.name)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

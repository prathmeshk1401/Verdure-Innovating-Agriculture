import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styles from "./cropManage.module.css";
import cropManagementIcon from "../../assets/icons/cropManagement.png";

const CropManagement = () => {
    const [crops, setCrops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDetails, setShowDetails] = useState(null);

    const [newCrop, setNewCrop] = useState({
        name: "",
        soil: "",
        stage: "",
        lastActivity: "",
        nextTask: "",
    });

    const token = localStorage.getItem("verdure_token");

    // ---------------- FETCH CROPS ----------------
    const fetchCrops = useCallback(async () => {
        try {
            setLoading(true);

            const res = await axios.get("/api/crop", {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log("API response =>", res.data);

            const result = res.data?.data || res.data;

            if (!Array.isArray(result)) {
                console.warn("CROP API returned non-array:", result);
                setCrops([]); 
                return;
            }

            setCrops(result);

        } catch (err) {
            setError("Failed to load crops. Please try again.");
            console.error("Fetch error:", err);
            setCrops([]);
        } finally {
            setLoading(false);
        }
    }, [token]);

    // Run fetch ONCE when page loads
    useEffect(() => {
        fetchCrops();
    }, [fetchCrops]);

    // ---------------- ADD CROP ----------------
    const handleAddCrop = async () => {
        try {
            if (!newCrop.name) return;

            await axios.post("/api/crop", newCrop, {
                headers: { Authorization: `Bearer ${token}` }
            });

            await fetchCrops();
            setShowAddModal(false);

            setNewCrop({
                name: "",
                soil: "",
                stage: "",
                lastActivity: "",
                nextTask: ""
            });

        } catch (err) {
            setError("Failed to add crop. Please try again.");
            console.error("Add error:", err);
        }
    };

    // ---------------- DELETE CROP ----------------
    const handleDeleteCrop = async (cropId) => {
        if (!window.confirm("Are you sure you want to delete this crop?")) return;

        try {
            await axios.delete(`/api/crop/${cropId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            await fetchCrops();
        } catch (err) {
            setError("Failed to delete crop. Please try again.");
            console.error("Delete error:", err);
        }
    };

    // ---------------- RENDER ----------------
    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className="spinner"></div>
                <p>Loading your crops...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <h3>❌ {error}</h3>
                <button onClick={fetchCrops} className={styles.btn}>
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className={styles.container}>

            {/* HEADER */}
            <div className={styles.headerContainer}>
                <h1>
                    <img src={cropManagementIcon} alt="crop management" />
                    Crop Management
                </h1>

                <button
                    onClick={() => setShowAddModal(true)}
                    className={styles.btn}
                >
                    Register a Fresh Crop
                </button>
            </div>

            {/* ADD CROP MODAL */}
            {showAddModal && (
                <div className={styles.cropInputContainer}>
                    <div className={styles.cropContainer}>
                        <h2>Register a Fresh Crop</h2>

                        <input type="text" placeholder="Crop Name"
                            value={newCrop.name}
                            onChange={(e) => setNewCrop({ ...newCrop, name: e.target.value })}
                        />

                        <input type="text" placeholder="Soil Type"
                            value={newCrop.soil}
                            onChange={(e) => setNewCrop({ ...newCrop, soil: e.target.value })}
                        />

                        <input type="text" placeholder="Stage"
                            value={newCrop.stage}
                            onChange={(e) => setNewCrop({ ...newCrop, stage: e.target.value })}
                        />

                        <input type="text" placeholder="Last Activity"
                            value={newCrop.lastActivity}
                            onChange={(e) => setNewCrop({ ...newCrop, lastActivity: e.target.value })}
                        />

                        <input type="text" placeholder="Next Task"
                            value={newCrop.nextTask}
                            onChange={(e) => setNewCrop({ ...newCrop, nextTask: e.target.value })}
                        />

                        <div className={styles.btnContainer}>
                            <button onClick={handleAddCrop} className={styles.btn}>Add</button>
                            <button onClick={() => setShowAddModal(false)} className={styles.btn}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* CROP CARDS GRID */}
            <div className={styles.cardContainer}>
                {Array.isArray(crops) && crops.length > 0 ? (
                    crops.map((crop) => (
                        <div key={crop._id} className={styles.card}>
                            <h3>🌾 {crop.name}</h3>
                            <p>Soil: {crop.soil}</p>
                            <p>Stage: {crop.stage}</p>
                            <p>Last Activity: {crop.lastActivity}</p>
                            <p>Next Task: {crop.nextTask}</p>

                            <div className={styles.btnContainer}>
                                <button onClick={() => setShowDetails(crop)} className={styles.btn}>View Details</button>
                                <button className={styles.btn}>Edit</button>
                                <button onClick={() => handleDeleteCrop(crop._id)} className={styles.btn}>Delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No crops found.</p>
                )}
            </div>

            {/* DETAILS MODAL */}
            {showDetails && (
                <div className={styles.cropDetailContainer}>
                    <div className={styles.cropContainer}>
                        <h2>Crop Details: {showDetails.name}</h2>

                        <p><strong>Soil:</strong> {showDetails.soil}</p>
                        <p><strong>Stage:</strong> {showDetails.stage}</p>
                        <p><strong>Last Activity:</strong> {showDetails.lastActivity}</p>
                        <p><strong>Next Task:</strong> {showDetails.nextTask}</p>

                        <div className={styles.insightsContainer}>
                            <h3>Insights</h3>
                            <ul>
                                <li>Soil Optimization: Maintain pH 6.0–7.0</li>
                                <li>Common Issues: Monitor pests regularly</li>
                                <li>Yield Analytics: Expected +10% this season</li>
                            </ul>
                        </div>

                        <div className={styles.btnContainer}>
                            <button onClick={() => setShowDetails(null)} className={styles.btn}>Close</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default CropManagement;

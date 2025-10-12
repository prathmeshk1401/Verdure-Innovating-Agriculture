import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Settings.module.css";

const Settings = () => {
    const [user, setUser ] = useState({
        name: "",
        email: "",
        phone: "",
        farmName: "",
        farmLocation: "",
        farmType: "",
        notifications: {
            email: true,
            sms: false,
            app: true
        }
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [editingSection, setEditingSection] = useState(null);
    const [formData, setFormData] = useState({});

    const token = localStorage.getItem("verdure_token");

    // Fetch user settings
    const fetchUserSettings = async () => {
        if (!token) {
            setError("No authentication token found. Please log in.");
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            setError("");
            const res = await axios.get("/api/user/settings", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser (res.data || user);
        } catch (err) {
            setError("Failed to load settings. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserSettings();
    }, [token]);

    // Handle input changes
    const handleInputChange = (e, section) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [name]: type === "checkbox" ? checked : value
            }
        }));
    };

    // Save settings for a section
    const saveSection = async (section) => {
        try {
            setError("");
            setSuccess("");
            const updatedData = { ...user, ...formData[section] };
            await axios.put("/api/user/settings", updatedData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser (updatedData);
            setSuccess(`Settings for ${section} updated successfully!`);
            setEditingSection(null);
            setFormData({});
        } catch (err) {
            setError("Failed to update settings. Please try again.");
            console.error(err);
        }
    };

    // Toggle edit mode for section
    const toggleEdit = (section) => {
        if (editingSection === section) {
            saveSection(section);
        } else {
            setEditingSection(section);
            setFormData(prev => ({
                ...prev,
                [section]: { ...user }
            }));
        }
    };

    // Change password handler
    const handlePasswordChange = async (e) => {
        e.preventDefault();
        const { currentPassword, newPassword, confirmPassword } = formData.password || {};
        if (newPassword !== confirmPassword) {
            setError("New passwords do not match.");
            return;
        }
        if (newPassword.length < 8) {
            setError("New password must be at least 8 characters long.");
            return;
        }
        try {
            await axios.put("/api/user/password", {
                currentPassword,
                newPassword
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSuccess("Password updated successfully!");
            setFormData(prev => ({ ...prev, password: {} }));
            setEditingSection(null);
        } catch (err) {
            setError("Failed to update password. Please check your current password.");
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className={styles.settingsPage}>
                <div className={styles.loadingContainer}>
                    <div className={styles.spinner}></div>
                    <p>Loading settings...</p>
                </div>
            </div>
        );
    }

    if (error && !token) {
        return (
            <div className={styles.settingsPage}>
                <div className={styles.errorContainer}>
                    <h3>❌ {error}</h3>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.settingsPage}>
            <header className={styles.settingsHeader}>
                <h2>⚙️ Account Settings</h2>
                <p>Manage your profile, farm details, and preferences</p>
            </header>

            {/* Profile Section */}
            <section className={styles.settingsSection}>
                <h3 className={styles.sectionTitle}>Profile Information</h3>
                <div className={styles.settingsCard}>
                    <div className={styles.formGroup}>
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.profile?.name || user.name}
                            onChange={(e) => handleInputChange(e, "profile")}
                            disabled={editingSection !== "profile"}
                            className={editingSection === "profile" ? styles.editable : ""}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.profile?.email || user.email}
                            onChange={(e) => handleInputChange(e, "profile")}
                            disabled={editingSection !== "profile"}
                            className={editingSection === "profile" ? styles.editable : ""}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.profile?.phone || user.phone}
                            onChange={(e) => handleInputChange(e, "profile")}
                            disabled={editingSection !== "profile"}
                            className={editingSection === "profile" ? styles.editable : ""}
                        />
                    </div>
                    <button
                        onClick={() => toggleEdit("profile")}
                        className={`${styles.actionBtn} ${editingSection === "profile" ? styles.saveBtn : styles.editBtn}`}
                    >
                        {editingSection === "profile" ? "Save Changes" : "Edit Profile"}
                    </button>
                </div>
            </section>

            {/* Farm Section */}
            <section className={styles.settingsSection}>
                <h3 className={styles.sectionTitle}>Farm Details</h3>
                <div className={styles.settingsCard}>
                    <div className={styles.formGroup}>
                        <label>Farm Name</label>
                        <input
                            type="text"
                            name="farmName"
                            value={formData.farm?.farmName || user.farmName}
                            onChange={(e) => handleInputChange(e, "farm")}
                            disabled={editingSection !== "farm"}
                            className={editingSection === "farm" ? styles.editable : ""}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Location</label>
                        <input
                            type="text"
                            name="farmLocation"
                            value={formData.farm?.farmLocation || user.farmLocation}
                            onChange={(e) => handleInputChange(e, "farm")}
                            disabled={editingSection !== "farm"}
                            className={editingSection === "farm" ? styles.editable : ""}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Farm Type</label>
                        <select
                            name="farmType"
                            value={formData.farm?.farmType || user.farmType}
                            onChange={(e) => handleInputChange(e, "farm")}
                            disabled={editingSection !== "farm"}
                            className={editingSection === "farm" ? styles.editable : ""}
                        >
                            <option value="">Select Type</option>
                            <option value="organic">Organic</option>
                            <option value="conventional">Conventional</option>
                            <option value="hydroponic">Hydroponic</option>
                            <option value="vertical">Vertical Farming</option>
                        </select>
                    </div>
                    <button
                        onClick={() => toggleEdit("farm")}
                        className={`${styles.actionBtn} ${editingSection === "farm" ? styles.saveBtn : styles.editBtn}`}
                    >
                        {editingSection === "farm" ? "Save Changes" : "Edit Farm Details"}
                    </button>
                </div>
            </section>

            {/* Notifications Section */}
            <section className={styles.settingsSection}>
                <h3 className={styles.sectionTitle}>Notification Preferences</h3>
                <div className={styles.settingsCard}>
                    <div className={styles.toggleGroup}>
                        <label>
                            <input
                                type="checkbox"
                                name="email"
                                checked={formData.notifications?.email ?? user.notifications.email}
                                onChange={(e) => handleInputChange(e, "notifications")}
                            />
                            Email Notifications
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="sms"
                                checked={formData.notifications?.sms ?? user.notifications.sms}
                                onChange={(e) => handleInputChange(e, "notifications")}
                            />
                            SMS Notifications
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="app"
                                checked={formData.notifications?.app ?? user.notifications.app}
                                onChange={(e) => handleInputChange(e, "notifications")}
                            />
                            App Push Notifications
                        </label>
                    </div>
                    <button
                        onClick={() => toggleEdit("notifications")}
                        className={`${styles.actionBtn} ${editingSection === "notifications" ? styles.saveBtn : styles.editBtn}`}
                    >
                        {editingSection === "notifications" ? "Save Preferences" : "Update Notifications"}
                    </button>
                </div>
            </section>

            {/* Security Section */}
            <section className={styles.settingsSection}>
                <h3 className={styles.sectionTitle}>Security</h3>
                <div className={styles.settingsCard}>
                    {editingSection === "password" ? (
                        <form onSubmit={handlePasswordChange} className={styles.passwordForm}>
                            <div className={styles.formGroup}>
                                <label>Current Password</label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={formData.password?.currentPassword || ""}
                                    onChange={(e) => handleInputChange(e, "password")}
                                    required
                                    className={styles.editable}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>New Password</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={formData.password?.newPassword || ""}
                                    onChange={(e) => handleInputChange(e, "password")}
                                    required
                                    className={styles.editable}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Confirm New Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.password?.confirmPassword || ""}
                                    onChange={(e) => handleInputChange(e, "password")}
                                    required
                                    className={styles.editable}
                                />
                            </div>
                            <div className={styles.formActions}>
                                <button type="submit" className={styles.saveBtn}>Update Password</button>
                                <button type="button" onClick={() => setEditingSection(null)} className={styles.cancelBtn}>Cancel</button>
                            </div>
                        </form>
                    ) : (
                        <>
                            <p className={styles.securityInfo}>Update your account password for better security.</p>
                            <button onClick={() => setEditingSection("password")} className={styles.actionBtn}>Change Password</button>
                        </>
                    )}
                </div>
            </section>

            {/* Account Section */}
            <section className={styles.settingsSection}>
                <h3 className={styles.sectionTitle}>Account Management</h3>
                <div className={styles.settingsCard}>
                    <div className={styles.accountOption}>
                        <h4>Privacy Settings</h4>
                        <p>Control what information is shared publicly.</p>
                        <button className={styles.editBtn}>Manage Privacy</button>
                    </div>
                    <div className={styles.accountOption}>
                        <h4>Delete Account</h4>
                        <p>Permanently delete your account and all data.</p>
                        <button className={styles.deleteBtn} onClick={() => {/* Handle delete */}}>Delete Account</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Settings;

import React from 'react';
// import GTranslate from 'gtranslate-react';
import styles from './Settings.module.css';

const Settings = () => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>User Settings</h1>
                {/* <div className={styles.languageSwitcher}>
                    <GTranslate
                        pageLanguage="en"
                        includedLanguages="en,es,fr,de,zh-CN,hi"
                        layout="dropdown"
                        autoDisplay={false}
                        className={styles.gtranslate}
                    />
                </div> */}
            </header>

            <section className={styles.settingsSection}>
                <h2>Profile Settings</h2>
                <form className={styles.form}>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" placeholder="Enter your username" />

                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" placeholder="Enter your email" />

                    <label htmlFor="notification">Notifications</label>
                    <select id="notification" defaultValue="enabled">
                        <option value="enabled">Enabled</option>
                        <option value="disabled">Disabled</option>
                    </select>

                    <label htmlFor="theme">Theme</label>
                    <select id="theme" defaultValue="light">
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>

                    <button type="submit" className={styles.saveBtn}>Save Changes</button>
                </form>
            </section>

            <section className={styles.settingsSection}>
                <h2>Farm Preferences</h2>
                <form className={styles.form}>
                    <label htmlFor="units">Units</label>
                    <select id="units" defaultValue="metric">
                        <option value="metric">Metric (kg, m)</option>
                        <option value="imperial">Imperial (lbs, ft)</option>
                    </select>

                    <label htmlFor="cropType">Preferred Crop Type</label>
                    <select id="cropType" defaultValue="vegetables">
                        <option value="vegetables">Vegetables</option>
                        <option value="fruits">Fruits</option>
                        <option value="grains">Grains</option>
                        <option value="flowers">Flowers</option>
                    </select>

                    <button type="submit" className={styles.saveBtn}>Save Preferences</button>
                </form>
            </section>
        </div>
    );
};

export default Settings;
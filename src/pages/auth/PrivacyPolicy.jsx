import React from "react";
import styles from "../../assets/styles/PrivacyPolicy.module.css";

const PrivacyPolicy = () => (
    <div className={styles.privacyContainer}>
        <h1 className={styles.privacyTitle}>Privacy Policy</h1>
        <p>
            <strong>Effective Date:</strong> 22/04/2025
        </p>
        <p>
            Welcome to <strong>Verdure</strong>! Your privacy is important to us, and we are committed to protecting the personal information you share with us.
        </p>

        <section className={styles.privacySection}>
            <h2>1. Information We Collect</h2>
            <ul>
                <li>
                    <strong>Personal Information:</strong> Name, email address, and contact details.
                </li>
                <li>
                    <strong>Usage Data:</strong> Pages visited, interactions with our services, preferences.
                </li>
                <li>
                    <strong>Location Data:</strong> If enabled, to personalize Agro Weather insights.
                </li>
            </ul>
        </section>

        <section className={styles.privacySection}>
            <h2>2. How We Use Your Information</h2>
            <ul>
                <li>To improve our services and provide personalized farming solutions.</li>
                <li>To send updates about agricultural insights, weather alerts, and crop trade opportunities.</li>
                <li>To ensure platform security and prevent unauthorized access.</li>
            </ul>
        </section>

        <section className={styles.privacySection}>
            <h2>3. Sharing of Data</h2>
            <ul>
                <li>We do not sell or trade user data.</li>
                <li>Limited sharing with trusted service providers for secure transactions.</li>
                <li>Data disclosure when required by legal authorities.</li>
            </ul>
        </section>

        <section className={styles.privacySection}>
            <h2>4. Security Measures</h2>
            <p>We implement encryption and security protocols to safeguard your information.</p>
        </section>

        <section className={styles.privacySection}>
            <h2>5. User Rights & Data Control</h2>
            <ul>
                <li>You can request access, modification, or deletion of your personal data.</li>
                <li>Opt-out of marketing emails anytime.</li>
            </ul>
        </section>

        <section className={styles.privacySection}>
            <h2>6. Cookies & Tracking</h2>
            <p>We use cookies to enhance user experience. Users can manage cookie preferences via browser settings.</p>
        </section>

        <section className={styles.privacySection}>
            <h2>7. Updates to This Policy</h2>
            <p>We may update this Privacy Policy. Users will be notified of significant changes.</p>
        </section>

        <section className={styles.privacySection}>
            <h2>8. Contact Us</h2>
            <p>If you have any questions or concerns, reach out to us:</p>
            <p>Email: verduretemp@gmail.com</p>
            <p>Address: 123 Agri Street, Pune, Maharashtra</p>
        </section>
    </div>
);

export default PrivacyPolicy;
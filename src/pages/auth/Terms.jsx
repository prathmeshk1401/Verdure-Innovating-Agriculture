import React from 'react';
import styles from "../../assets/styles/Terms.module.css";

function Terms() {
    return (
        <div className={styles.termsContainer}>
            <h1 className={styles.termsTitle}>VERDURE - Terms and Conditions</h1>
            <section className={styles.termsSection}>
                <h2>1. Introduction</h2>
                <p>Welcome to VERDURE. These Terms and Conditions govern your use of our website and services. By accessing or using our services, you agree to be bound by these Terms and Conditions.</p>
            </section>
            <section className={styles.termsSection}>
                <h2>2. Acceptance of Terms</h2>
                <p>By using VERDURE, you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these terms, you should not use our services.</p>
            </section>
            <section className={styles.termsSection}>
                <h2>3. Eligibility</h2>
                <p>You must be at least 18 years old to use our services. By using our services, you represent and warrant that you meet the eligibility criteria.</p>
            </section>
            <section className={styles.termsSection}>
                <h2>4. User Responsibilities</h2>
                <p>Users are responsible for providing accurate information, maintaining the security of their accounts, and not engaging in prohibited activities.</p>
            </section>
            <section className={styles.termsSection}>
                <h2>5. Privacy Policy</h2>
                <p>Our Privacy Policy explains how we collect, use, and protect your personal information. By using our services, you consent to our data practices described in the Privacy Policy.</p>
            </section>
            <section className={styles.termsSection}>
                <h2>6. Intellectual Property</h2>
                <p>All content on our website, including text, images, and logos, is the intellectual property of VERDURE and may not be used without permission.</p>
            </section>
            <section className={styles.termsSection}>
                <h2>7. Third-Party Links and Services</h2>
                <p>Our website may contain links to third-party websites and services. We are not responsible for the content or practices of these third parties.</p>
            </section>
            <section className={styles.termsSection}>
                <h2>8. Account Termination</h2>
                <p>We reserve the right to terminate or suspend user accounts for violations of these Terms and Conditions or other applicable policies.</p>
            </section>
            <section className={styles.termsSection}>
                <h2>9. Limitation of Liability</h2>
                <p>VERDURE is not liable for any damages arising from the use of our services, to the fullest extent permitted by law.</p>
            </section>
            <section className={styles.termsSection}>
                <h2>10. Dispute Resolution</h2>
                <p>Any disputes arising from these Terms and Conditions will be resolved through arbitration in accordance with the laws of Maharashtra, India.</p>
            </section>
            <section className={styles.termsSection}>
                <h2>11. Governing Law</h2>
                <p>These Terms and Conditions are governed by the laws of Maharashtra, India.</p>
            </section>
            <section className={styles.termsSection}>
                <h2>12. Changes to Terms</h2>
                <p>We may modify these Terms and Conditions at any time. We will notify users of any changes by updating the date at the bottom of this page.</p>
            </section>
            <section className={styles.termsSection}>
                <h2>13. Contact Information</h2>
                <p>For any questions or concerns about these Terms and Conditions, please contact us at: <a href="mailto:verduretemp@gmail.com">verduretemp@gmail.com</a>.</p>
            </section>
            <section className={styles.termsSection}>
                <h2>14. Last Updated</h2>
                <p>Last Updated: 07/03/2025</p>
            </section>
        </div>
    );
}

export default Terms;
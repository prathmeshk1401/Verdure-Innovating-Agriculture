import communityIcon from "../../assets/icons/community.png";
import forumIcon from "../../assets/icons/forum.png";
import messagesIcon from "../../assets/icons/messages.png";
import accountIcon from "../../assets/icons/account.png";
import notificationIcon from "../../assets/icons/notification.png";
import settingsIcon from "../../assets/icons/settings.png";
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";
import dropdownIcon from "../../assets/icons/dropDown.png";
import dashboardIcon from "../../assets/icons/dashboard.png";
import cropManagementIcon from "../../assets/icons/cropManagement.png";
import analyticsIcon from "../../assets/icons/analytics.png";
import scheduleIcon from "../../assets/icons/schedule.png";
import paymentIcon from "../../assets/icons/payment.png";
import weatherIcon from "../../assets/icons/weather.png";
import soilIcon from "../../assets/icons/soil.png";
import toolsIcon from "../../assets/icons/tools.png";
import newsIcon from "../../assets/icons/news.png";
import importedCrop from "../../assets/icons/import-crop.png";
import servicesIcon from "../../assets/icons/customer-service.png";
import logoutIcon from "../../assets/icons/user-logout.png";

import verdure from "../../assets/VERDURE-logo.png"
import exportCrop from "../../assets/icons/logistics.png"

function Sidebar() {
    const [openServices, setOpenServices] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const [openCommunity, setOpenCommunity] = useState(false);
    const [showCommunity, setShowCommunity] = useState(false);

    const [openAccount, setOpenAccount] = useState(false);
    const [showAccount, setShowAccount] = useState(false);

    const handleDropdownClick = () => {
        if (!openServices) {
            setOpenServices(true);
            setTimeout(() => setShowMenu(true), 300);
        } else {
            setShowMenu(false);
            setTimeout(() => setOpenServices(false), 300);
        }
    };

    const handleCommunityDropdown = () => {
        if (!openCommunity) {
            setOpenCommunity(true);
            setTimeout(() => setShowCommunity(true), 300);
        } else {
            setShowCommunity(false);
            setTimeout(() => setOpenCommunity(false), 300);
        }
    };

    const handleAccountDropdown = () => {
        if (!openAccount) {
            setOpenAccount(true);
            setTimeout(() => setShowAccount(true), 300);
        } else {
            setShowAccount(false);
            setTimeout(() => setOpenAccount(false), 300);
        }
    };

    return (
        <div className={styles.sidebarContainer}>
            {/* <Link to={"/dashboard"} className='logo'> <img src={#} alt="logo" id="logo" className='logo'/></Link> */}

            <div className={styles.menuContainer}>
                <Link to="/Dashboard" className={styles.menuItem}><img src={dashboardIcon} alt="dashboard" /><span>Dashboard</span></Link>
                <Link to="/Crop-Management" className={styles.menuItem}><img src={cropManagementIcon} alt="crop management" /><span>Crop Management</span></Link>
                <Link to="/Analytics" className={styles.menuItem}><img src={analyticsIcon} alt="analytics" /><span>Analytics</span></Link>
                <Link to="/Schedules" className={styles.menuItem}><img src={scheduleIcon} alt="schedules" /><span>Schedules</span></Link>
                <Link to="/Payments" className={styles.menuItem}><img src={paymentIcon} alt="Payments" /><span>Payments</span></Link>

                <div className={styles.menuItem} onClick={handleDropdownClick} style={{ cursor: 'pointer' }}>
                    <img src={servicesIcon} alt="services" />
                    <span>Other Services</span>
                    <img src={dropdownIcon} alt="arrow" className={`${styles.dropdown} ${openServices ? styles.open : ''}`} />
                </div>

                {showMenu && (
                    <div className={styles.servicesContainer}>
                        <Link to="/Weather" className={`${styles.menuItem} ${styles.services}`}><img src={weatherIcon} alt="weather" /><span>Agro Weather</span></Link>
                        <Link to="/GlobalCrops" className={`${styles.menuItem} ${styles.services}`}><img src={importedCrop} alt="imported crop" /><span>Global Crops</span></Link>
                        <Link to="/ExportCrops" className={`${styles.menuItem} ${styles.services}`}><img src={exportCrop} alt="Export crop" /><span>Export Crops</span></Link>
                        <Link to="/SoilTesting" className={`${styles.menuItem} ${styles.services}`}><img src={soilIcon} alt="soil" /><span>Soil Testing</span></Link>
                        <Link to="/tools" className={`${styles.menuItem} ${styles.services}`}><img src={toolsIcon} alt="tools" /><span>Tools & Calculators</span></Link>
                        <Link to="/news" className={`${styles.menuItem} ${styles.services}`}><img src={newsIcon} alt="news" /><span>News & Updates</span></Link>
                    </div>
                )}

                <div className={styles.menuItem} onClick={handleCommunityDropdown} style={{ cursor: 'pointer' }}>
                    <img src={communityIcon} alt="community" />
                    <span>Community</span>
                    <img src={dropdownIcon} alt="arrow" className={`${styles.dropdown} ${openCommunity ? styles.open : ''}`} />
                </div>
                {showCommunity && (
                    <div className={styles.servicesContainer}>
                        <Link to="/Forum" className={`${styles.menuItem} ${styles.communityLink}`}><img src={forumIcon} alt="forum" /><span>Forum</span></Link>
                        <Link to="/Messages" className={`${styles.menuItem} ${styles.communityLink}`}><img src={messagesIcon} alt="messages" /><span>Messages</span></Link>
                    </div>
                )}

                <div className={styles.menuItem} onClick={handleAccountDropdown} style={{ cursor: 'pointer' }}>
                    <img src={accountIcon} alt="accounts" />
                    <span>Accounts</span>
                    <img src={dropdownIcon} alt="arrow" className={`${styles.dropdown} ${openAccount ? styles.open : ''}`} />
                </div>
                {showAccount && (
                    <div className={styles.servicesContainer}>
                        <Link to="/Notifications" className={`${styles.menuItem} ${styles.accountsLink}`}><img src={notificationIcon} alt="notifications" /><span>Notifications</span></Link>
                        <Link to="/Settings" className={`${styles.menuItem} ${styles.accountsLink}`}><img src={settingsIcon} alt="settings" /><span>Settings</span></Link>
                    </div>
                )}
            </div>
            <Link to="/logout" className={`${styles.menuItem} ${styles.logout}`}><img src={logoutIcon} alt="logout" /><span>Logout</span></Link>
        </div>
    );
}

export default Sidebar;

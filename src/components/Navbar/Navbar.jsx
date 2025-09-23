import React from 'react'
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css"

const Navbar = () => {
    return (
        <nav>
            <div className='navContainer'>
                <Link to="/" className='logo'>
                    <img src="/VERDURE-logo.png" alt="Logo" id="logo" />
                </Link>
            </div>
        </nav>
    )
}

export default Navbar

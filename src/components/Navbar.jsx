import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export default function Navbar() {
    const [showBottomBar, setShowBottomBar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setShowBottomBar(window.scrollY < lastScrollY);
            setLastScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <nav>
            <div className="nav-container">
                {/* Logo */}
                <Link to="/" className="logo-wrapper">
                    <img src="VERDURE-logo.png" alt="Logo" id="logo" />
                </Link>

                {/* Desktop Links */}
                <ul className="nav-links">
                    <li><HashLink smooth to="/#home" className="navBtn">Home</HashLink></li>
                    <li><HashLink smooth to="/#about" className="navBtn">About</HashLink></li>
                    <li><HashLink smooth to="/#services" className="navBtn">Services</HashLink></li>
                    <li><HashLink smooth to="/#testimonials" className="navBtn">Testimonials</HashLink></li>
                    <li><HashLink smooth to="/#contact" className="navBtn">Contact</HashLink></li>
                    <li><Link to="/login" className="navBtn">Login</Link></li>
                </ul>
            </div>

            {/* Mobile bottom bar */}
            <div className={`mobile-bottombar ${showBottomBar ? "show" : "hide"}`}>
                <HashLink smooth to="/#home" className="icon-link">
                    <i className="fa-solid fa-house"></i>
                </HashLink>
                <HashLink smooth to="/#about" className="icon-link">
                    <i className="fa-solid fa-user"></i>
                </HashLink>
                <HashLink smooth to="/#services" className="icon-link">
                    <i className="fa-solid fa-seedling"></i>
                </HashLink>
                <HashLink smooth to="/#testimonials" className="icon-link">
                    <i className="fa-solid fa-comments"></i>
                </HashLink>
                <HashLink smooth to="/#contact" className="icon-link">
                    <i className="fa-solid fa-phone-volume"></i>
                </HashLink>
                <Link to="/user-dashboard/login" className="icon-link">
                    <i className="fa-solid fa-right-to-bracket"></i>
                </Link>
            </div>
        </nav>
    );
}

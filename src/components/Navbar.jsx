import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
    const location = useLocation();
    const isMainPage = location.pathname === "/";

    useEffect(() => {
        // Only inject GTranslate scripts if not already present
        if (!document.getElementById('gtranslate-settings')) {
            const gtranslateScript = document.createElement("script");
            gtranslateScript.id = 'gtranslate-settings';
            gtranslateScript.innerHTML = `window.gtranslateSettings = { "default_language": "en", "native_language_names": true, "detect_browser_language": true, "languages": ["en", "hi", "mr", "ta", "te"], "wrapper_selector": ".gtranslate_wrapper", "flag_size": 16, "switcher_horizontal_position": "inline", "switcher_open_direction": "top", "flag_style": "3d" }`;
            document.body.appendChild(gtranslateScript);
        }
        if (!document.getElementById('gtranslate-widget')) {
            const gtranslateWidget = document.createElement("script");
            gtranslateWidget.id = 'gtranslate-widget';
            gtranslateWidget.src = "https://cdn.gtranslate.net/widgets/latest/dwf.js";
            gtranslateWidget.defer = true;
            document.body.appendChild(gtranslateWidget);
        }
        // No cleanup to avoid removing scripts needed globally
    }, []);

    // Helper to get correct href
    const getHref = (hash) => isMainPage ? hash : "/" + hash;

    return (
        <nav>
            <div className="nav-container">
                {/* Logo with Link to Home */}
                <a href={getHref("#home")} className="logo-wrapper">
                    <img src="VERDURE-logo.png" alt="Logo" id="logo" />
                </a>

                {/* Menu Toggle */}
                <div className="menu-toggle" id="menuToggle">
                    <i className="fa-solid fa-bars"></i>
                </div>

                {/* Icon-based Navigation (Horizontal Menu) */}
                <div className="horizontal-menu" id="horizontalMenu">
                    <a href={getHref("#home")} className="icon-link"><i className="fa-solid fa-house"></i></a>
                    <a href={getHref("#about")} className="icon-link"><i className="fa-solid fa-user"></i></a>
                    <a href={getHref("#services")} className="icon-link"><i className="fa-solid fa-seedling"></i></a>
                    <a href={getHref("#testimonials")} className="icon-link"><i className="fa-solid fa-comments"></i></a>
                    <a href={getHref("#contact")} className="icon-link"><i className="fa-solid fa-phone-volume"></i></a>
                </div>

                {/* Nav-Links for wider screens */}
                <ul className="nav-links">
                    <li><a href={getHref("#home")}>Home</a></li>
                    <li><a href={getHref("#about")}>About</a></li>
                    <li><a href={getHref("#services")}>Services</a></li>
                    <li><a href={getHref("#testimonials")}>Testimonials</a></li>
                    <li><a href={getHref("#contact")}>Contact</a></li>
                    <li><Link to="/login">Login</Link></li>
                    <li>
                        <div className="gtranslate_wrapper"></div>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
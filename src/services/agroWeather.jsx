import React from "react";
import "../assets/styles/GlobalPages.css";
import Loader from "../components/Loader";
import { useState, useEffect } from "react";

const AgroWeather = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Show loader only for first load
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500); // adjust timing
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Loader />;
    }


    return (
        <div >
            <header className="weatherHeader">
                <h1>Agro Weather Overview</h1>
                <p>Stay informed with real-time weather updates and crop insights.</p>
            </header>

            <section className="weatherSearch-box">
                <input type="text" placeholder="Enter your location..." />
                <button>Get Weather</button>
            </section>
            <div className="liveWeatherContainer">
                <section className="live-weather">
                    <h2>Live Weather</h2>
                    <div className="weather-stats">
                        <div className="stat">
                            <p className="label">Temperature</p>
                            <p className="value">28°C</p>
                        </div>
                        <div className="stat">
                            <p className="label">Humidity</p>
                            <p className="value">65%</p>
                        </div>
                        <div className="stat">
                            <p className="label">Wind</p>
                            <p className="value">12 km/h</p>
                        </div>
                        <div className="stat">
                            <p className="label">Precipitation</p>
                            <p className="value">2 mm</p>
                        </div>
                    </div>
                </section>

                <section className="weatherForecast">
                    <h2>7-Day Forecast</h2>
                    <div className="weatherForecast-grid">
                        <div className="day">Mon<br /><span>☀️ 30°C</span></div>
                        <div className="day">Tue<br /><span>🌧 24°C</span></div>
                        <div className="day">Wed<br /><span>⛅ 27°C</span></div>
                        <div className="day">Thu<br /><span>🌦 26°C</span></div>
                        <div className="day">Fri<br /><span>☀️ 32°C</span></div>
                        <div className="day">Sat<br /><span>🌩 23°C</span></div>
                        <div className="day">Sun<br /><span>🌧 22°C</span></div>
                    </div>
                </section>

                <section className="alerts">
                    <h2>Weather Alerts</h2>
                    <ul>
                        <li>⚠️ Heavy rain expected tomorrow in southern regions.</li>
                        <li>🔥 Drought warning for northwest districts.</li>
                        <li>🐛 Pest risk: Aphid activity high due to humidity.</li>
                    </ul>
                </section>

                <section className="crop-advice">
                    <h2>Seasonal Crop Guidance</h2>
                    <p>
                        It's a great week to plant leafy vegetables due to cooler temperatures. Delay sowing groundnuts due to
                        expected storms on Tuesday and Saturday.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default AgroWeather;

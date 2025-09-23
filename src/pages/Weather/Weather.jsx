import React, { useState, useEffect } from "react";
import styles from "./Weather.module.css";

const fetchWeatherData = async (city, apiKey) => {
    const response = await fetch(
        `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=${apiKey}&q=${city}&format=json&num_of_days=1`
    );
    const data = await response.json();
    const current = data.data.current_condition[0];
    return {
        temp: current.temp_C,
        humidity: current.humidity,
        wind: current.windspeedKmph,
        precipitation: current.precipMM,
        desc: current.weatherDesc[0].value
    };
};

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState("Mumbai");
    const [input, setInput] = useState("");
    const apiKey = "6e9e6556aea843379ca145826251509";

    useEffect(() => {
        fetchWeatherData(city, apiKey).then(setWeather);
    }, [city]);

    const handleGetWeather = () => {
        if (input.trim()) setCity(input.trim());
    };

    return (
        <div className={styles["agroWeatherContainer"]}>
            <header className={styles["weatherHeader"]}>
                <h2>Agro Weather Overview</h2>
                <p>Stay informed with real-time weather updates and crop insights.</p>
            </header>

            <section className={styles["weatherSearch-box"]}>
                <input
                    type="text"
                    placeholder="Enter your location..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />
                <button onClick={handleGetWeather}>Get Weather</button>
            </section>

            <div className={styles["liveWeatherContainer"]}>
                <section className={styles["live-weather"]}>
                    <h2>Live Weather</h2>
                    <div className={styles["weather-stats"]}>
                        <div className={styles.stat}>
                            <p className={styles.label}>Temperature</p>
                            <p className={styles.value}>{weather ? `${weather.temp}°C` : "-"}</p>
                        </div>
                        <div className={styles.stat}>
                            <p className={styles.label}>Humidity</p>
                            <p className={styles.value}>{weather ? `${weather.humidity}%` : "-"}</p>
                        </div>
                        <div className={styles.stat}>
                            <p className={styles.label}>Wind</p>
                            <p className={styles.value}>{weather ? `${weather.wind} km/h` : "-"}</p>
                        </div>
                        <div className={styles.stat}>
                            <p className={styles.label}>Precipitation</p>
                            <p className={styles.value}>{weather ? `${weather.precipitation} mm` : "-"}</p>
                        </div>
                    </div>
                    <div style={{marginTop:8, color:'#2c662d'}}>
                        {weather ? weather.desc : ""}
                    </div>
                </section>

                <section className={styles["weatherForecast"]}>
                    <h2>7-Day Forecast</h2>
                    <div className={styles["weatherForecast-grid"]}>
                        <div className={styles.day}>Mon<br /><span>☀️ 30°C</span></div>
                        <div className={styles.day}>Tue<br /><span>🌧 24°C</span></div>
                        <div className={styles.day}>Wed<br /><span>⛅ 27°C</span></div>
                        <div className={styles.day}>Thu<br /><span>🌦 26°C</span></div>
                        <div className={styles.day}>Fri<br /><span>☀️ 32°C</span></div>
                        <div className={styles.day}>Sat<br /><span>🌩 23°C</span></div>
                        <div className={styles.day}>Sun<br /><span>🌧 22°C</span></div>
                    </div>
                </section>

                <section className={styles.alerts}>
                    <h2>Weather Alerts</h2>
                    <ul>
                        <li>⚠️ Heavy rain expected tomorrow in southern regions.</li>
                        <li>🔥 Drought warning for northwest districts.</li>
                        <li>🐛 Pest risk: Aphid activity high due to humidity.</li>
                    </ul>
                </section>

                <section className={styles["crop-advice"]}>
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

export default Weather;

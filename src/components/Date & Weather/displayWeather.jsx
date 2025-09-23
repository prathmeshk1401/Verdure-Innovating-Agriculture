// WeatherDisplay.jsx
import React, { useEffect, useState } from "react";

const WeatherDisplay = ({ city }) => {
    const [weather, setWeather] = useState(null);
    const apiKey = "6e9e6556aea843379ca145826251509"; // replace with your WorldWeatherOnline key

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(
                    `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=${apiKey}&q=${city}&format=json&num_of_days=1`
                );
                const data = await response.json();

                // Extract key weather data
                const current = data.data.current_condition[0];
                const temp = current.temp_C;
                const desc = current.weatherDesc[0].value;

                setWeather(`${desc}, ${temp}°C`);
            } catch (err) {
                console.error("Weather fetch failed:", err);
            }
        };

        fetchWeather();
    }, [city]);

    return <span>{weather ? weather : "Loading weather..."}</span>;
};

export default WeatherDisplay;

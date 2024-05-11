import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${location}&days=4&aqi=yes&alerts=yes
          `
        );
        setWeatherData(response.data);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    if (location) {
      fetchData();
    }
  }, [location]);

  const handleSetLocationChange = (event) => {
    setLocation(event.target.value);
  };
  return (
    <div className="app-container">
      <h1 className="app-title">Hava Durumu Uygulaması</h1>
      <div className="input-container">
        <input
          className="location-input"
          type="text"
          placeholder="Şehir giriniz..."
          value={location}
          onChange={handleSetLocationChange}
        />
      </div>

      {weatherData && (
        <div className="weather-container">
          {weatherData.forecast.forecastday.map((day) => (
            <div className="day-container">
              <h2 className="date">{day.date}</h2>
              <img
                className="weather-icon"
                src={day.day.condition.icon}
                alt="weather icon"
              />
              <p className="temperature">{day.day.condition.text}</p>
              <p className="temperature">Max: {day.day.maxtemp_c}°C</p>
              <p className="temperature">Min: {day.day.mintemp_c}°C</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

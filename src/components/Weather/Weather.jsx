import { useEffect, useState } from "react";
import loader from "../../assets/loader.svg";
import browser from "../../assets/browser.svg";
import "./Weather.css";
const APIKEY = import.meta.env.VITE_WEATHER_API_KEY;

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://api.airvisual.com/v2/nearest_city?key=${APIKEY}`
        );
        // Vérifier doc API pour savoir comment récupérer les donné<es></es>
        // Log the response
        // Style à approfondir

        // Voir aussi api meteo france qui est gratuite
        console.log(response);

        // Check for response errors
        if (!response.ok) {
          throw new Error(`Error ${response.status}, ${response.statusText}`);
        }

        const responseData = await response.json();

        console.log(responseData);

        // Update state with weather data
        setWeatherData({
          city: responseData.data.city,
          country: responseData.data.country,
          state: responseData.data.state,
          iconId: responseData.data.current.weather.ic,
          temperature: responseData.data.current.weather.tp,
        });
      } catch (err) {
        // Handle errors
        setErrorInfo(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="weather-app">
      <h2 className="title">2-Meteo locale</h2>

      <div
        className={`loader-container ${!weatherData && !errorInfo && "active"}`}
      >
        <img src={loader} alt="loading icon" />
      </div>

      {weatherData && (
        <>
          <p className="city-name">{weatherData.city}</p>
          <p className="country-name">{weatherData.country}</p>
          <p className="country-name">{weatherData.state}</p>
          <p className="temperature">{weatherData.temperature}°</p>
          <div className="info-icon-container">
            <img
              src={`/icons/${weatherData.iconId}.svg`}
              className="info-icon"
              alt="weather icon"
            />
          </div>
        </>
      )}

      {errorInfo && !weatherData && (
        <>
          <p className="error-information">{errorInfo}</p>
          <img src={browser} alt="error icon" />
        </>
      )}
    </div>
  );
}

export default Weather;

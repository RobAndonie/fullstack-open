import { fetchWeather } from "../services/weatherApi";
import { useState, useEffect } from "react";

const CountryData = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const [iconId, setIconId] = useState(null);

  const languages = Object.keys(country.languages).map((key) => [
    key,
    country.languages[key],
  ]);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const response = await fetchWeather(
          country.capitalInfo.latlng[0],
          country.capitalInfo.latlng[1]
        );

        setWeather(response);
        setIconId(response.weather[0].icon);
      } catch (error) {
        console.log(error);
      }
    };

    getWeather();
  }, []);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <ul>
        {languages.map((language) => (
          <li key={language[0]}>{language[1]}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <h2>Weather in {country.capital[0]}</h2>
      {weather && iconId && (
        <div>
          <p>
            Temperature: {Math.round(100 * (weather.main.temp - 273.15)) / 100}{" "}
            Celsius
          </p>

          <p>Wind: {weather.wind.speed} m/s</p>

          <img
            src={`http://openweathermap.org/img/wn/${iconId}@2x.png`}
            alt="Weather icon"
          />
        </div>
      )}
    </div>
  );
};

export default CountryData;

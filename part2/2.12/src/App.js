import React, { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ search, handleSearchChange }) => {
  return (
    <div>
      Find countries <input value={search} onChange={handleSearchChange} />
    </div>
  );
};

const Weather = ({ country }) => {

  const [weather, setWeather] = useState([]);

  useEffect(() => {
    console.log(process.env.REACT_APP_API_KEY);
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital[0]}`)
      .then((response) => {
        setWeather(response.data);
        console.log("weather", response.data);
      });
  }, []);

  if (weather.length === 0) {
    return (
      <div>
        <p>loading weather...</p>
      </div>
    );
  } else {
    return (
      <div>
        <h3>Weather in {country.capital[0]}</h3>
        <div>
          <b>temperature: </b> {weather.current.temperature} Celcius
        </div>
        <img src={weather.current.weather_icons[0]} alt="weather icon" />
        <div>
          <b>wind: </b> {weather.current.wind_speed} mph direction{" "}
          {weather.current.wind_dir}
        </div>
      </div>
    );
  }
}

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>
        <b>capital: </b> {country.capital[0]}
      </div>
      <div>
        <b>population: </b> {country.population}
      </div>
      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="country flag" width="200" />
      <Weather country={country} />
    </div>
  );
}

const ShowCountry = ({ country }) => {
  return (
    <div>
      <Country country={country} />
    </div>
  );
}

const button = (country) => {
  return (
    <button onClick={() => <ShowCountry country={country} />}>show</button>
  );
}

const CountryList = ({ countries }) => {

  if (countries.length < 10 && countries.length > 1) {
    return (
      <div>
        {countries.map((country) => (
          <div key={country.name.common}>
            {country.name.common}
            {button(country)}
          </div>
        ))}
      </div>
    );
  } else if (countries.length === 1) {
    return (
      <div>
        <ShowCountry country={countries[0]} />
      </div>
    );
  }
}

function App() {

  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log("effect executed");
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const countriesToShow = countries.filter((country) => country.name.common.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <Filter search={search} handleSearchChange={handleSearchChange} />

      {countriesToShow.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        <CountryList countries={countriesToShow} />
      )}

    </div>
  );
}

export default App;

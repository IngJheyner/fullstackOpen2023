import React, { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ search, handleSearchChange }) => {
  return (
    <div>
      Find countries <input value={search} onChange={handleSearchChange} />
    </div>
  );
};

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital[0]}</div>
      <div>population {country.population}</div>
      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        height="100"
        alt={`flag of ${country.name.common}`}
      />
    </div>
  );
}

const CountryList = ({ countries }) => {

  if (countries.length < 10 && countries.length > 1) {
    return (
      <div>
        {countries.map((country) => (
          <div key={country.name.common}>
            {country.name.common}
          </div>
        ))}
      </div>
    );
  }else if (countries.length === 1) {
    return (
      <Country country={countries[0]} />
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

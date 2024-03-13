import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import "./Countries.scss";

const Countries = () => {
  const [data, setData] = useState([]);
  const [rangeValue, setRangeValue] = useState(36);
  const [selectedRadio, setSelectedRadio] = useState("");
  const [search, setSearch] = useState(""); // État pour la recherche
  const radios = ["Africa", "America", "Asia", "Europe", "Oceania"];

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setData(response.data);
      } catch (error) {
        // Gérer l'erreur ici
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchCountries();
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredData = data
    .filter((country) =>
      selectedRadio ? country.continents[0].includes(selectedRadio) : true
    )
    .filter((country) =>
      search.length >= 3
        ? country.name.common.toLowerCase().includes(search.toLowerCase())
        : true
    );

  return (
    <div className="countries">
      <h2>3-Géographie drapeaux, pays, capitales et population </h2>
      <ul className="radio-container">
        <input
          type="range"
          min="1"
          max="250"
          defaultValue={rangeValue}
          onChange={(e) => setRangeValue(e.target.value)}
        />
        {radios.map((continent) => (
          <li key={continent}>
            <input
              type="radio"
              id={continent}
              name="continentRadio"
              checked={continent === selectedRadio}
              onChange={(e) => setSelectedRadio(e.target.id)}
            />
            <label htmlFor={continent}>{continent}</label>
          </li>
        ))}
      </ul>
      {selectedRadio && (
        <button onClick={() => setSelectedRadio("")}>
          Annuler la recherche
        </button>
      )}
      <div className="search-box">
        <input
          type="text"
          placeholder="Rechercher un pays..."
          value={search}
          onChange={handleSearch}
        />
      </div>
      {search.length >= 3 && filteredData.length === 0 && (
        <p>Aucun pays trouvé</p>
      )}
      <ul className="flags-container">
        {filteredData
          .sort((a, b) => b.population - a.population)
          .slice(0, rangeValue)
          .map((country, index) => (
            <Card key={index} country={country} />
          ))}
      </ul>
    </div>
  );
};

export default Countries;

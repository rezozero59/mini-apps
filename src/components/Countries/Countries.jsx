// Importation des modules nécessaires, y compris React, axios pour les requêtes HTTP, et les styles CSS.
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card"; // Composant pour afficher chaque pays
import "./Countries.scss";

// Définition du composant fonctionnel `Countries`.
const Countries = () => {
  // Déclaration des états avec useState.
  const [data, setData] = useState([]); // Pour stocker les données des pays.
  const [rangeValue, setRangeValue] = useState(36); // Pour la valeur du slider qui contrôle le nombre de pays affichés.
  const [selectedRadio, setSelectedRadio] = useState(""); // Pour la région sélectionnée via les boutons radio.
  const [search, setSearch] = useState(""); // Pour la chaîne de recherche saisie par l'utilisateur.
  const radios = ["Africa", "America", "Asia", "Europe", "Oceania"]; // Options des boutons radio.

  useEffect(() => {
    // Fonction asynchrone pour récupérer les données des pays.
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all"); // Requête HTTP pour obtenir les données.
        setData(response.data); // Mise à jour de l'état avec les données reçues.
        console.log(response.data);
      } catch (error) {
        // En cas d'erreur dans la requête, elle est affichée dans la console.
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchCountries(); // Appel de la fonction pour récupérer les données.
  }, []); // Le tableau de dépendances vide indique que cet effet ne s'exécute qu'au montage du composant.

  // Gestion de la saisie dans le champ de recherche.
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  // Filtrage des données basé sur la région sélectionnée et la recherche.
  const filteredData = data
    .filter((country) =>
      selectedRadio ? country.continents[0].includes(selectedRadio) : true
    )
    .filter((country) =>
      search.length >= 3
        ? country.name.common.toLowerCase().includes(search.toLowerCase())
        : true
    );

  // Rendu du composant.
  return (
    <div className="countries">
      <h2>3-Géographie drapeaux, pays, capitales et population</h2>
      <ul className="radio-container">
        <input
          type="range"
          min="1"
          max="250"
          defaultValue={rangeValue}
          onChange={(e) => setRangeValue(e.target.value)}
        />
        {radios.map((continent) => (
          // Génération des boutons radio pour le filtrage par continent.
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
          .sort((a, b) => b.population - a.population) // Tri des pays par population décroissante.
          .slice(0, rangeValue) // Limite le nombre de pays affichés selon la valeur du slider.
          .map((country, index) => (
            <Card key={index} country={country} /> // Affichage de chaque pays avec le composant Card.
          ))}
      </ul>
    </div>
  );
};

export default Countries;

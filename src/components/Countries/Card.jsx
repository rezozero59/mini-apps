// Importation de React et du fichier de style spécifique à ce composant.
import React from "react";
import "./Card.scss";

// Définition du composant fonctionnel `Card`. Ce composant attend un objet `country` comme prop.
const Card = ({ country }) => {
  // Le rendu du composant retourne un élément de liste (`<li>`) qui contient :
  return (
    <li className="card">
      <img
        // L'image du drapeau du pays. `country.flags.svg` pointe vers l'URL du drapeau en format SVG.
        src={country.flags.svg}
        // Le texte alternatif de l'image combine le mot "drapeau" avec le nom du pays en français.
        // `country.translations.fra.common` récupère la traduction en français du nom commun du pays.
        alt={"drapeau " + country.translations.fra.common}
      />
      <div className="infos">
        {/* Le nom du pays en français. */}
        <h2>{country.translations.fra.common}</h2>
        {/* // La capitale du pays. Si un pays a plusieurs capitales, seule la
        première est affichée. */}
        <h4>{country.capital}</h4>
        {/* // La population du pays, formatée pour inclure des séparateurs de
        milliers pour faciliter la lecture. //
        `country.population.toLocaleString()` convertit le nombre de population
        en une chaîne de caractères avec des séparateurs. */}
        <p>Pop. {country.population.toLocaleString()}</p>
      </div>
    </li>
  );
};

// Exportation du composant `Card` pour qu'il puisse être utilisé dans d'autres parties de l'application.
export default Card;

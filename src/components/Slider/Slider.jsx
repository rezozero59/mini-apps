// Importation des hooks useState et useEffect depuis React.
import { useState, useEffect } from "react";
// Importation des images des flèches utilisées pour naviguer dans le carrousel.
import leftChevron from "../../assets/left-arrow.svg";
import rightChevron from "../../assets/right-arrow.svg";
// Importation du fichier CSS pour appliquer des styles au composant Slider.
import "./Slider.css";
// Importation des données du slider qui contiennent les informations des images à afficher.
import sliderData from "../../data/sliderData";

// Définition du composant fonctionnel Slider.
export default function Slider() {
  // Utilisation du hook useState pour gérer l'index de l'image actuellement affichée dans le slider.
  // sliderIndex est la valeur de l'état, et setSliderIndex est la fonction qui permet de modifier cet état.
  // L'état initial est défini à 1, ce qui correspond à la première image du carrousel.
  const [sliderIndex, setSliderIndex] = useState(1);

  // Définition de la fonction toggleImage qui permet de changer l'image affichée.
  function toggleImage(indexPayload) {
    // Utilisation de setSliderIndex pour mettre à jour l'index de l'image.
    // Cette fonction prend en argument une fonction qui reçoit l'état actuel (state) et retourne le nouvel état.
    setSliderIndex((state) => {
      // Si l'ajout de indexPayload au state dépasse la longueur de sliderData, retourner 1 pour revenir à la première image.
      if (indexPayload + state > sliderData.length) {
        return 1;
      }
      // Si le résultat est inférieur à 1, retourner la longueur de sliderData pour aller à la dernière image.
      else if (indexPayload + state < 1) {
        return sliderData.length;
      }
      // Sinon, ajouter indexPayload à state pour obtenir le nouvel index.
      else {
        return state + indexPayload;
      }
    });
  }

  // Utilisation du hook useEffect pour créer un effet de bord.
  useEffect(() => {
    // Création d'un intervalle qui appelle toggleImage(1) toutes les 3000 millisecondes (3 secondes),
    // ce qui fait défiler automatiquement les images du carrousel.
    const intervalID = setInterval(() => toggleImage(1), 3000);

    // Fonction de nettoyage qui sera appelée lors du démontage du composant.
    // Elle supprime l'intervalle pour éviter des effets indésirables ou des fuites de mémoire.
    return () => clearInterval(intervalID);
  }, []); // Le tableau de dépendances vide indique que cet effet ne s'exécute qu'au montage du composant.

  // Le rendu du composant Slider.
  return (
    <div className="slider-container">
      <h2 className="slider-title">1-Slider photos</h2>
      <p className="slider-subtitle">
        Cliquer sur les flèches pour changer de photo
      </p>
      <p className="index-info">
        {sliderIndex} / {sliderData.length}
      </p>
      <div className="slider">
        <p className="image-info">
          {sliderData.find((obj) => obj.id === sliderIndex).description}
        </p>
        <img
          src={`/images/test-${sliderIndex}.jpg`}
          alt="photographies"
          className="slider-img"
        />
        <button
          onClick={() => toggleImage(-1)}
          className="navigation-button prev-button"
        >
          <img src={leftChevron} alt="previous image" />
        </button>
        <button
          onClick={() => toggleImage(1)}
          className="navigation-button next-button"
        >
          <img src={rightChevron} alt="next image" />
        </button>
      </div>
    </div>
  );
}

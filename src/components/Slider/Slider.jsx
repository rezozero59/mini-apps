import { useState, useEffect } from "react";
import leftChevron from "../../assets/left-arrow.svg";
import rightChevron from "../../assets/right-arrow.svg";
import "./Slider.css";
import sliderData from "../../data/sliderData";

export default function Slider() {
  const [sliderIndex, setSliderIndex] = useState(1);

  function toggleImage(indexPayload) {
    // let newState
    // if(indexPayload + sliderIndex > sliderData.length){
    //   newState = 1
    // }
    // else if(indexPayload + sliderIndex < 1) {
    //   newState = sliderData.length
    // }
    // else {
    //   newState = indexPayload + sliderIndex
    // }
    // setSliderIndex(newState)

    setSliderIndex((state) => {
      if (indexPayload + state > sliderData.length) {
        return 1;
      } else if (indexPayload + state < 1) {
        return sliderData.length;
      } else {
        return state + indexPayload;
      }
    });
  }

  useEffect(() => {
    const intervalID = setInterval(() => toggleImage(1), 3000);

    return () => clearInterval(intervalID);
  }, []);

  return (
    <div className="slider-container">
      <h2 className="slider-title"> 1-Slider photos</h2>
      <p className="slider-subtitle">
        Click on the arrows to navigate through the images
      </p>
      <p className="index-info">
        {sliderIndex} / {sliderData.length}
      </p>
      <div className="slider">
        <p className="image-info">
          {sliderData.find((obj) => obj.id === sliderIndex).description}
        </p>
        <img
          src={`/images/test00${sliderIndex}.jpg`}
          alt="estate's rooms"
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

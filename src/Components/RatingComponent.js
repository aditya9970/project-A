import React from "react";
import { useState } from "react";

const RatingComponent = ({ movieId, size, handleCallBack }) => {
  const [rating, setRating] = useState(-1);
  const [isRatingChanged, setIsRatingChanged] = useState(false);

  const handleRatingChangeWithClick = (rating) => {
    setIsRatingChanged(true);
    setRating(rating);
  };

  const handleRatingChangeWithHover = (rating) => {
    if (size) {
      setIsRatingChanged(true);
      setRating(rating);
    }
  };

  const handleRating = (e) => {
    e.preventDefault();
    // update(movieId, rating);
    handleCallBack();
  };
  return (
    <div
      className={`d-flex justify-content-center align-items-center  ${
        size == "large" && "flex-column"
      }`}
    >
      <div className={`d-flex   justify-content-center align-items-center`}>
        {" "}
        <i
          onMouseOver={() => handleRatingChangeWithHover(1)}
          onClick={() => handleRatingChangeWithClick(1)}
          class={`star_icon ${
            size === "large" && "_lg"
          } bi bi-star-fill mx-1  ${rating >= 1 && "text-warning"}`}
        ></i>
        <i
          onMouseOver={() => handleRatingChangeWithHover(2)}
          onClick={() => handleRatingChangeWithClick(2)}
          class={`star_icon ${
            size === "large" && "_lg"
          } bi bi-star-fill mx-1  ${rating >= 2 && "text-warning"}`}
        ></i>
        <i
          onMouseOver={() => handleRatingChangeWithHover(3)}
          onClick={() => handleRatingChangeWithClick(3)}
          class={`star_icon ${
            size === "large" && "_lg"
          } bi bi-star-fill mx-1   ${rating >= 3 && "text-warning"}`}
        ></i>
        <i
          onMouseOver={() => handleRatingChangeWithHover(4)}
          onClick={() => handleRatingChangeWithClick(4)}
          class={`star_icon ${
            size === "large" && "_lg"
          } bi bi-star-fill mx-1  ${rating >= 4 && "text-warning"} `}
        ></i>
        <i
          onMouseOver={() => handleRatingChangeWithHover(5)}
          onClick={() => handleRatingChangeWithClick(5)}
          class={`star_icon ${
            size === "large" && "_lg"
          } bi bi-star-fill mx-1  ${rating >= 5 && "text-warning"} `}
        ></i>
        {rating > 0 && (
          <div className={`star_icon ${size === "large" && "_lg"} mx-2`}>
            {rating}/5
          </div>
        )}
      </div>

      <div>
        <button
          type="button"
          className={`btn n btn-warning w-20 ${
            size === "large" && "mt-2"
          } text-light`}
          onClick={handleRating}
        >
          Rate
        </button>
      </div>
    </div>
  );
};

export default RatingComponent;

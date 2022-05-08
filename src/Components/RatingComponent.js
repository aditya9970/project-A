import React, { useEffect } from "react";
import { useState } from "react";
import { getReview, reviewMovie } from "../api/reviews";

const RatingComponent = ({ movieId, size, toggleRefresh, handleClose }) => {
  const [rating, setRating] = useState(-1);
  const [isRatingChanged, setIsRatingChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRatingChangeWithClick = (rating) => {
    setIsRatingChanged(true);
    setRating(rating);
  };

  useEffect(() => {
    console.log("movieId Updated");
    let userId = JSON.parse(localStorage.getItem("userId"));
    getReview({ userId, movieId })
      .then(({ data }) => {
        console.log({ reviewData: data });
        data ? setRating(data.rating) : setRating(-1);
        setIsRatingChanged(false);
      })
      .catch((err) => console.log(err));
  }, [movieId]);

  const handleRating = () => {
    setIsLoading(true);
    console.log({ movieId });

    let userId = JSON.parse(localStorage.getItem("userId"));
    reviewMovie({
      userId: userId,
      movieId: movieId,
      rating: rating,
    })
      .then(({ data }) => {
        setIsLoading(false);
        toggleRefresh && toggleRefresh();
        handleClose && handleClose();
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
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
          onClick={() => handleRatingChangeWithClick(1)}
          class={`star_icon ${
            size === "large" && "_lg"
          } bi bi-star-fill mx-1  ${rating >= 1 && "text-warning"}`}
        ></i>
        <i
          onClick={() => handleRatingChangeWithClick(2)}
          class={`star_icon ${
            size === "large" && "_lg"
          } bi bi-star-fill mx-1  ${rating >= 2 && "text-warning"}`}
        ></i>
        <i
          onClick={() => handleRatingChangeWithClick(3)}
          class={`star_icon ${
            size === "large" && "_lg"
          } bi bi-star-fill mx-1   ${rating >= 3 && "text-warning"}`}
        ></i>
        <i
          onClick={() => handleRatingChangeWithClick(4)}
          class={`star_icon ${
            size === "large" && "_lg"
          } bi bi-star-fill mx-1  ${rating >= 4 && "text-warning"} `}
        ></i>
        <i
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
          disabled={!isRatingChanged || isLoading}
          onClick={() => handleRating(rating)}
        >
          {isLoading ? "Loading...." : "Rate"}
        </button>
      </div>
    </div>
  );
};

export default RatingComponent;

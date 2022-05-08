import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMoviebyId } from "../api/movies";

const MovieCard = ({ movieId, handleReload }) => {
  let history = useNavigate();
  const [movieData, setMovieData] = useState();
  useEffect(() => {
    getMoviebyId(movieId)
      .then(({ data }) => {
        console.log({ data });
        setMovieData(data);
      })
      .catch((err) => console.log(err));
  }, [movieId]);
  return (
    <>
      {movieData && (
        <div
          class="card bg-black border border-light py-2 m-4"
          style={{ width: "300px" }}
          onClick={() => {
            history("/movies/" + movieData.id);
            handleReload();
          }}
          key={movieData.id}
        >
          <img
            class="card-img-top img_warp "
            style={{ width: "100%" }}
            alt="movie-img"
            src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
          />
          <div class="card-body text-start" style={{ overflow: "hidden" }}>
            <h5 class="card-title text-start">{movieData.title}</h5>

            {movieData.genres.map((item, i) => {
              return <span class="badge bg-primary mx-1">{item.name}</span>;
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;

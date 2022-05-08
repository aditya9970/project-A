import React, { useState, useEffect } from "react";
import { getMoviebyId, getReccomendedByMovie } from "../api/movies";
import MovieCard from "./MovieCard";
import RatingComponent from "./RatingComponent";

export const MovieComponent = () => {
  let userId = JSON.parse(localStorage.getItem("userId"));
  const [movieData, setMovieData] = useState();
  const [reload, setReload] = useState(false);
  const [similarMovies, setSimilarMovies] = useState();

  const reloadPage = () => {
    setReload(!reload);
  };

  useEffect(() => {
    getMoviebyId(window.location.href.split("/").pop())
      .then(({ data }) => {
        setMovieData(data);
        getReccomendedByMovie(window.location.href.split("/").pop())
          .then(({ data }) => {
            console.log({ data });
            setSimilarMovies(data.reccomendations);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reload]);

  return (
    <>
      {movieData && (
        <div className="container text-light mt-5">
          <div className="animation">
            <div className="row">
              <div className="col-12 col-md-3 text-center">
                <img
                  className="img img-fluid"
                  alt="movie-poster"
                  src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
                />
              </div>
              <div className="col-12 col-md-9 ">
                <h2 className="text-main">{movieData.title}</h2>
                <h5 className="mt-2 text-main">
                  {movieData.genres.map((item) => (
                    <span class="badge bg-outline-light border border-light mx-1">
                      {item.name}
                    </span>
                  ))}
                </h5>
                <p className="text-main">{movieData.Year}</p>
                <hr />
                <div className="row ">
                  <div className="col-3 text-main">
                    <p>Vote Average: </p>
                    <p>Relase Date: </p>
                    <p>Language: </p>
                  </div>
                  <div className="col-9">
                    <p>{movieData.vote_average} / 10 </p>
                    <p>{movieData.release_date} </p>
                    <p>{movieData.original_language.toUpperCase()} </p>
                  </div>
                </div>
                <hr />
                {movieData.runtime && (
                  <div className="row">
                    <div className="col-3 text-main">Runtime</div>
                    <div className="col-9">{minToHm(movieData.runtime)}</div>
                  </div>
                )}
                {movieData.production_companies && (
                  <div className="row">
                    <div className="col-3 text-main">Production</div>
                    <div className="col-9">
                      <div>
                        {movieData.production_companies
                          .map((company) => company.name)
                          .join(", ")}
                      </div>
                    </div>
                  </div>
                )}

                <div className="row"></div>
              </div>
            </div>
            {userId && (
              <div className="row mt-2 text-center">
                <hr />
                <RatingComponent movieId={movieData.id} size="large" />
              </div>
            )}
            <hr />
            <div className="row mt-2">
              <div className="col-12">
                <h4 className="text-main"> Plot</h4>
                <p>{movieData.overview}</p>
              </div>
            </div>
            <hr />
            <h3 className="text-main"> Similar Movies</h3>
            <div className=" scrollable">
              {similarMovies &&
                similarMovies.map((similarMovie, i) => {
                  if (i !== 0)
                    return (
                      <MovieCard
                        movieId={similarMovie}
                        handleReload={reloadPage}
                        key={similarMovie.id}
                      />
                    );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const minToHm = (m) => {
  let h = Math.floor(m / 60);
  h += h < 0 ? 1 : 0;
  let m2 = Math.abs(m % 60);
  m2 = m2 < 10 ? "0" + m2 : m2;
  return `${h && h + "h"} ${m2 && m2 + "m"}`;
};

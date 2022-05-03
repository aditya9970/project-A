import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";
import RatingComponent from "./RatingComponent";

export const MovieComponent = () => {
  const minToHm = (m) => {
    let h = Math.floor(m / 60);
    h += h < 0 ? 1 : 0;
    let m2 = Math.abs(m % 60);
    m2 = m2 < 10 ? "0" + m2 : m2;
    return `${h && h + "h"} ${m2 && m2 + "m"}`;
  };
  const result = {
    _id: "626bf5ff9a85b029b493da43",
    adult: "False",
    belongs_to_collection:
      "{'id': 10194, 'name': 'Toy Story Collection', 'poster_path': '/7G9915LfUQ2lVfwMEEhDsn3kT4B.jpg', 'backdrop_path': '/9FBwqcd9IRruEDUrTdcaafOMKUq.jpg'}",
    budget: "30000000",
    genres: [
      { id: 16, name: "Animation" },
      { id: 35, name: "Comedy" },
      { id: 10751, name: "Family" },
    ],
    homepage: "http://toystory.disney.com/toy-story",
    id: "862",
    imdb_id: "tt0114709",
    original_language: "en",
    original_title: "Toy Story",
    overview:
      "Led by Woody, Andy's toys live happily in his room until Andy's birthday brings Buzz Lightyear onto the scene. Afraid of losing his place in Andy's heart, Woody plots against Buzz. But when circumstances separate Buzz and Woody from their owner, the duo eventually learns to put aside their differences.",
    popularity: "21.946943",
    poster_path: "/rhIRbceoE9lR4veEXuwCC2wARtG.jpg",
    production_companies: [{ name: "Pixar Animation Studios", id: 3 }],
    production_countries:
      "[{'iso_3166_1': 'US', 'name': 'United States of America'}]",
    release_date: "1995-10-30",
    revenue: "373554033",
    runtime: "81.0",
    spoken_languages: "[{'iso_639_1': 'en', 'name': 'English'}]",
    status: "Released",
    tagline: "",
    title: "Toy Story",
    video: "False",
    vote_average: "7.7",
    vote_count: "5415",
  };
  return (
    <>
      {result && (
        <div className="container text-light">
          <div className="animation">
            <button className="btn btn-outline-light my-2">Go back</button>
            <div className="row">
              <div className="col-12 col-md-3 text-center">
                <img
                  className="img img-fluid"
                  alt="movie-poster"
                  src={result.Poster}
                />
              </div>
              <div className="col-12 col-md-9 ">
                <h2 className="text-main">{result.title}</h2>
                <h5 className="mt-2 text-main">
                  {result.genres.map((item) => (
                    <span class="badge bg-primary mx-1">{item.name}</span>
                  ))}
                </h5>
                <p className="text-main">{result.Year}</p>
                <hr />
                <div className="row ">
                  <div className="col-3 text-main">
                    <p>Vote Average: </p>
                    <p>Relase Date: </p>
                    <p>Language: </p>
                  </div>
                  <div className="col-9">
                    <p>{result.vote_average} / 10 </p>
                    <p>{result.release_date} </p>
                    <p>{result.original_language.toUpperCase()} </p>
                  </div>
                </div>
                <hr />
                {result.runtime && (
                  <div className="row">
                    <div className="col-3 text-main">Runtime</div>
                    <div className="col-9">{minToHm(result.runtime)}</div>
                  </div>
                )}
                {result.production_companies && (
                  <div className="row">
                    <div className="col-3 text-main">Production</div>
                    <div className="col-9">
                      <div>
                        {result.production_companies
                          .map((company) => company.name)
                          .join(", ")}
                      </div>
                    </div>
                  </div>
                )}

                <div className="row">
                  <div className="col-3 text-main">Adult Rated</div>
                  <div className="col-9">{result.adult}</div>
                </div>
              </div>
            </div>
            <div className="row mt-2 text-center">
              <hr />
              <RatingComponent movieId={result._id} size="large" />
            </div>
            <hr />
            <div className="row mt-2">
              <div className="col-12">
                <h4 className="text-main"> Plot</h4>
                <p>{result.overview}</p>
              </div>
            </div>
            <hr />
            <h3 className="text-main"> Similar Movies</h3>
            <div className=" scrollable">
              <MovieCard />
              <MovieCard />
              <MovieCard />
              <MovieCard />
              <MovieCard />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

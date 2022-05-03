import React from "react";

const MovieCard = (movie) => {
  movie = {
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
    <div
      class="card bg-black border border-light py-2 m-4"
      style={{ width: "300px" }}
    >
      <img
        class="card-img-top img_warp"
        alt="movie-img"
        src="https://m.media-amazon.com/images/M/MV5BZTk2ZmUwYmEtNTcwZS00YmMyLWFkYjMtNTRmZDA3YWExMjc2XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
      />
      <div class="card-body">
        <h5 class="card-title text-start">{movie.title}</h5>
        <div className="text-start">
          <br />
          {movie.genres.map((item, i) => {
            return <span class="badge bg-primary mx-1">{item.name}</span>;
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

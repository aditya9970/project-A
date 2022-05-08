import API from "./axios";
export const getRecommendations = (userId, limit) => {
  return API.post("/api/movies/recommend", { userId });
};

export const getMoviebyId = (movieId) => {
  return API.get("/api/movies/" + movieId);
};

export const getReccomendedByMovie = (movieId) => {
  return API.get("/api/movies/recommend/" + movieId);
};

import API from "./axios";
export const getRecommendations = (history) => {
  return API.post("/api/movies/recommend", { history });
};

export const getMoviebyId = (movieId) => {
  return API.get("/api/movies/" + movieId);
};

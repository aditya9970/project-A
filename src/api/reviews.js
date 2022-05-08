import API from "./axios";
export const getReviewByUser = (userId) => {
  return API.post("/api/reviews/user", { userId });
};

export const reviewMovie = (reviewData) => {
  return API.post("/api/reviews", reviewData);
};

export const deleteReview = (reviewId) => {
  return API.delete(`/api/reviews/${encodeURI(reviewId)}`);
};

export const getReview = ({ userId, movieId }) => {
  return API.get("/api/reviews", { params: { userId, movieId } });
};

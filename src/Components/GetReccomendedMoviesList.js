import React, { useState, useEffect } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardTitle,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { getMoviebyId, getRecommendations } from "../api/movies";
import RatingComponent from "./RatingComponent";

const GetReccomendedMoviesList = () => {
  const [userHistory, setUserHistory] = useState([]);
  const [movies, setMovies] = useState([]);
  const [reviewModalIsOpen, setReviewModalIsOpen] = useState(false);
  const [selectedMovieData, setSelectedMovieData] = useState({});

  const review = () => {};

  const openModel = (movieData) => {
    setReviewModalIsOpen(true);
    setSelectedMovieData(movieData);
  };
  const closeModel = () => {
    setReviewModalIsOpen(false);
    setSelectedMovieData({});
  };

  useEffect(() => {
    getRecommendations()
      .then(({ data }) => {
        console.log(data);
        setMovies(Object.keys(data.reccomendations));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="container my-5 relative">
        <h1>Recommended Movies</h1>
        <div className="row my-2">
          {movies &&
            movies.map((movie) => (
              <MovieCard movieId={movie} handleOpen={openModel} />
            ))}
        </div>
        {reviewModalIsOpen && (
          <ReviewModal
            data={selectedMovieData}
            isOpen={reviewModalIsOpen}
            handleClose={closeModel}
          />
        )}
      </div>
    </>
  );
};

const MovieCard = ({ movieId, handleOpen }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [movieData, setMovieData] = useState({});
  useEffect(() => {
    getMoviebyId(movieId)
      .then(({ data }) => {
        console.log(data);
        setMovieData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {" "}
      {movieData && (
        <div className="col-3 my-3">
          <Card
            inverse
            onMouseEnter={() => {
              setIsHovered(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
            }}
          >
            <CardImg
              alt="Card image cap"
              className={`image-ratio ${isHovered && "img_hover"}`}
              src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
              width="100%"
            />
            <CardImgOverlay>
              {isHovered && (
                <div className="d-flex  justify-content-center align-items-center h-100 ">
                  <button
                    className="btn btn-warning"
                    onClick={() => handleOpen(movieData)}
                  >
                    Rate
                  </button>
                </div>
              )}
            </CardImgOverlay>
          </Card>
        </div>
      )}
    </>
  );
};

const ReviewModal = ({ data, isOpen, handleClose }) => {
  return (
    <Modal className="bg-black text-black" toggle={handleClose} isOpen={isOpen}>
      <ModalHeader toggle={handleClose}>{data.original_title}</ModalHeader>
      <ModalBody>
        <div className="row">
          <h5>Genres</h5>

          <div>
            {data.genres.map((item) => (
              <span class="badge bg-dark border border-light mx-1">
                {item.name}
              </span>
            ))}
          </div>
          <div className="mt-1">
            <hr />
            <h5>Rating</h5>
            <RatingComponent size="large" />
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default GetReccomendedMoviesList;

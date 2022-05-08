import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { getReviewByUser, reviewMovie } from "../api/reviews";
import RatingComponent from "./RatingComponent";

const GetReccomendedMoviesList = () => {
  const [refresh, setRefresh] = useState(false);
  const [userHistory, setUserHistory] = useState([]);
  const [movies, setMovies] = useState([]);

  const toggleRefresh = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    console.log("toggleRefresh");
    let userId = JSON.parse(localStorage.getItem("userId"));
    console.log({ userId });
    getRecommendations(userId)
      .then(({ data }) => {
        console.log("got movies", data.reccomendations);
        setMovies(data.reccomendations);
      })
      .catch((err) => console.log(err));
  }, [refresh]);

  return (
    <>
      <div className="container my-5 relative">
        <h1>Recommended Movies</h1>
        <div className="row my-2">
          {movies &&
            movies.map((movie) => (
              <MovieCard
                movieId={movie}
                toggleRefresh={toggleRefresh}
                key={movie}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export const MovieCard = ({ movieId, handleOpen, toggleRefresh }) => {
  const [userId, setUserId] = useState();
  let history = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [movieData, setMovieData] = useState({});
  const openModel = (movieData) => {
    setIsModalOpen(true);
  };
  const closeModel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    let userId = localStorage.getItem("userId");
    userId && setUserId(JSON.parse(userId));
    getMoviebyId(movieId)
      .then(({ data }) => {
        setMovieData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {movieData && (
        <div className="col-3 my-3">
          <Card
            inverse
            onMouseEnter={() => {
              userId && setIsHovered(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
            }}
            onClick={() => {
              console.log(movieData.id);
              history("/movies/" + movieData.id);
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
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsModalOpen(true);
                    }}
                  >
                    Rate
                  </button>
                </div>
              )}
            </CardImgOverlay>
          </Card>
          <ReviewModal
            data={movieData}
            isOpen={isModalOpen}
            handleClose={closeModel}
            toggleRefresh={toggleRefresh}
            selectedMovieId={movieData.id}
          />
        </div>
      )}
    </>
  );
};

const ReviewModal = ({
  data,
  isOpen,
  handleClose,
  selectedMovieId,
  toggleRefresh,
}) => {
  return (
    <>
      {" "}
      <Modal
        className="bg-black text-black"
        toggle={handleClose}
        isOpen={isOpen}
      >
        <ModalHeader toggle={handleClose}>{data.original_title}</ModalHeader>
        <ModalBody>
          <div className="row">
            <h5>Genres</h5>

            <div>
              {data.genres &&
                data.genres.map((item) => (
                  <span class="badge bg-dark border border-light mx-1">
                    {item.name}
                  </span>
                ))}
            </div>
            <div className="mt-1">
              <hr />
              <h5>Rating</h5>
              <RatingComponent
                size="large"
                movieId={selectedMovieId}
                toggleRefresh={toggleRefresh}
                handleClose={handleClose}
              />
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default GetReccomendedMoviesList;

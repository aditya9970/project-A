import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { getMoviebyId } from "../api/movies";
import { deleteReview, getReviewByUser } from "../api/reviews";
import RatingComponent from "./RatingComponent";

const UserReviewComponent = () => {
  return (
    <div>
      <ReviewList />
    </div>
  );
};

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("userId"));
    console.log(userId);

    getReviewByUser(userId)
      .then(({ data }) => {
        console.log(data);
        setReviews(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refreshData]);

  const handleRefresh = () => {
    setRefreshData(!refreshData);
  };
  return (
    <>
      {reviews.length !== 0 ? (
        <ListGroup>
          {reviews.map((review) => (
            <ReviewCard
              review={review}
              handleRefresh={handleRefresh}
              key={review._id}
            />
          ))}
        </ListGroup>
      ) : (
        <p className=" my-2 text-light">No Reviews to Show</p>
      )}
    </>
  );
};

const ReviewCard = ({ review, handleRefresh }) => {
  let history = useNavigate();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  const [movieData, setMovieData] = useState();
  useEffect(() => {
    console.log(review);
    getMoviebyId(review.movieId)
      .then(({ data }) => {
        console.log(data);
        setMovieData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDeleteReview = (id) => {
    console.log(review);
    deleteReview(id)
      .then(({ data }) => {
        toggle();
        handleRefresh();
      })
      .catch((err) => {});
  };
  const handleUpdate = () => {};

  const toggle = () => {
    setIsDeleteOpen(!isDeleteOpen);
  };
  const toggleUpdate = () => {
    setIsUpdateOpen(!isUpdateOpen);
  };
  return (
    <>
      {movieData && (
        <ListGroupItem
          className="bg-black border border-white text-light d-flex my-1 rounded"
          style={{ position: "relative" }}
          onClick={() => {
            history(`/movies/${movieData.id}`);
          }}
        >
          <div style={{ maxWidth: "100px" }}>
            <img
              className="w-100"
              src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
            />
          </div>
          <div className="w-100 mx-2">
            <h3>{movieData.title}</h3>
            {movieData.genres.map((item) => (
              <span class="badge bg-dark border border-light mx-1">
                {item.name}
              </span>
            ))}
            <div className="mt-2">
              <h5>Rating</h5>
              <div className="d-flex">
                <StarRating rating={review.rating} />
                <div className="mx-2">{review.rating}/5 </div>
              </div>
            </div>
          </div>
          <div
            className="d-flex"
            style={{ position: "absolute", right: "10px", top: "10px" }}
          >
            <i
              class="bi bi-pencil ml-2 fs-5"
              onClick={(e) => {
                e.stopPropagation();
                setIsUpdateOpen(true);
              }}
            ></i>
            <i
              class="bi bi-x-lg ml-2 fs-5"
              onClick={(e) => {
                e.stopPropagation();

                setIsDeleteOpen(true);
              }}
            ></i>
          </div>
          <Modal
            toggle={() => toggle()}
            isOpen={isDeleteOpen}
            className=" text-black"
          >
            <ModalHeader toggle={() => toggle()}>Warning</ModalHeader>
            <ModalBody>
              You are about to delete the review of "{movieData.title}". This
              action is Rrreversible
            </ModalBody>
            <ModalFooter>
              <button onClick={toggle} className="btn btn-secondary">
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteReview(review._id)}
              >
                Delete
              </button>{" "}
            </ModalFooter>
          </Modal>
          <ReviewModal
            data={movieData}
            isOpen={isUpdateOpen}
            handleClose={() => {
              toggleUpdate();
              // handleRefresh();
            }}
            toggleRefresh={handleRefresh}
            selectedMovieId={movieData.id}
          />
        </ListGroupItem>
      )}
    </>
  );
};

const StarRating = ({ rating }) => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        return (
          <i
            class={`bi bi-star${
              index + 1 <= rating ? "-fill text-warning" : ""
            } mx-1`}
          ></i>
        );
      })}
    </div>
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
  );
};

export default UserReviewComponent;

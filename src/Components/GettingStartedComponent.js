import React, { useState } from "react";
import RatingComponent from "./RatingComponent";

const GettingStartedComponent = () => {
  const [userList, setUserList] = useState([]);
  return (
    <div className="container py-5">
      <h1>Getting Started</h1>
      <SearchBarComponent />
      <HistoryComponent />
    </div>
  );
};

const SearchBarComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [moviesList, setMoviesList] = useState([
    { original_title: "kama" },
    { original_title: "kama" },
    { original_title: "kama" },
  ]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchBarForm = () => {
    return (
      <div class="input-group rounded my-2">
        <input
          type="search"
          class="form-control rounded"
          placeholder="Search Movies"
          aria-label="Search"
          aria-describedby="search-addon"
          onChange={handleSearchChange}
          value={searchTerm}
        />
        <span class="input-group-text border-0" id="search-addon">
          <i class="bi bi-search"></i>
        </span>
      </div>
    );
  };

  const searchedList = () => {
    return (
      <>
        {moviesList && (
          <ul class="list-group list-group-flush ">
            {moviesList.map((movie, i) => (
              <li
                class={`list-group-item d-flex justify-content-between align-items-center text-white bg-black ${
                  i !== 0 && "border-top border-light"
                }`}
              >
                <div>{movie.original_title}</div>
                <RatingComponent
                  handleCallBack={() => {
                    setSearchTerm("");
                    setMoviesList([]);
                  }}
                />
              </li>
            ))}
          </ul>
        )}
      </>
    );
  };

  return (
    <div className="">
      <div className="row">{searchBarForm()}</div>
      <div className=" w-full ">{searchedList()}</div>
    </div>
  );
};

const HistoryComponent = () => {
  return <div></div>;
};
export default GettingStartedComponent;

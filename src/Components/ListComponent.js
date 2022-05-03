import React from "react";
import { Link } from "react-router-dom";

export const ListComponent = ({ error, result, total, more }) => {
  console.log(total, result);
  return (
    <div className="container">
      <div className="row">
        {error && <p className="text-light">{error}</p>}
        {result &&
          result.map((item) => {
            return <RenderCard data={item} key={item.imdbID} />;
          })}
      </div>
      {total > result.length && (
        <button className="btn btn-secondary" onClick={more}>
          Show More
        </button>
      )}
    </div>
  );
};

const RenderCard = ({ data }) => {
  return (
    <div className=" col col-6 col-md-3 py-2">
      <div className="animation">
        <Link to={`/${data.imdbID}`}>
          <div className="card card-custom text-light">
            <img src={data.Poster} className="card-img-top" alt="..." />
            <div className="card-body ">
              <h5 className="card-title">{data.Title}</h5>
              <p className="card-text">
                {data.Type} <span>{data.Year}</span>
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

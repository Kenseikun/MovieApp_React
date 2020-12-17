import React from "react";
import "./WatchList.scss";

const WatchList = (props) => {
  const { watchList, deletMovieFromWatchList } = props;
  return (
    <>
      <div className="watch__list--wrapper">
        <p className="page__title">Watch List</p>
        <ul className="movies__watch--wrapper">
          {watchList.map((movie) => {
            const { id, title, poster_path, vote_average } = movie;
            return (
              <li className="movie__list" key={id}>
                <img
                  className="movie__cover"
                  src={`http://image.tmdb.org/t/p/w185/${poster_path}`}
                  alt="movie cover"
                />
                <p className="movie__title">{title}</p>
                <p className="movie__rating">
                  <i className="fas fa-star"></i> {vote_average} / 10
                </p>
                <button onClick={() => deletMovieFromWatchList(id)}>
                  Delete this movie
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default WatchList;

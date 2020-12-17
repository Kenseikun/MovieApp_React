import React from "react";
import "./SingleMovie.scss";

const SingleMovie = (props) => {
  console.log(props);
  const {
    title,
    id,
    poster_path,
    overview,
    vote_average,
    original_language,
    popularity,
  } = props.location.state;

  const { handleAddToWatch } = props;
  return (
    <div className="movie__wrapper">
      <div className="movie__card--wrapper">
        <img
          src={`http://image.tmdb.org/t/p/w500/${poster_path}`}
          alt="movie cover"
        />
        <p className="movie__title">{title}</p>
        <p className="movie__overwiew">{overview}</p>
        <p className="movie__rate">{vote_average} / 10</p>
        <p>{original_language}</p>
        <button onClick={() => handleAddToWatch(id)}>Add to watch list</button>
      </div>
    </div>
  );
};

export default SingleMovie;

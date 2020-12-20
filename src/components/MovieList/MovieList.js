import React from "react";
import { Link } from "react-router-dom";
import "./MovieList.scss";

const MovieList = ({
  movies,
  handleAddToWatch,
  moviesAfterSearch,
  pageNumber,
  handleNextPageBtn,
  handlePrevPageBtn,
  handleSortBtn,
  sortedBtnActive,
}) => {
  console.log(sortedBtnActive);
  return (
    <>
      <div className="top__rated--wrapper">
        <p className="page__title">Top rated</p>

        {moviesAfterSearch.length === 0 ? (
          <>
            <p style={{ color: "white" }}>No movies...</p>
          </>
        ) : (
          <>
            <button onClick={handleSortBtn} className="rating__btn">
              {sortedBtnActive ? "Lower rating sort" : "Top rated"}
            </button>

            <ul className="movies__wrapper">
              {moviesAfterSearch.map((movie) => {
                const {
                  id,
                  title,
                  poster_path,
                  overview,
                  vote_average,
                  original_language,
                  popularity,
                } = movie;
                return (
                  <li className="movie__list" key={id}>
                    <img
                      className="movie__cover"
                      src={`http://image.tmdb.org/t/p/w500/${poster_path}`}
                      alt="movie cover"
                    />
                    <p className="movie__title">{title}</p>
                    <p className="movie__rating">
                      <i className="fas fa-star"></i> {vote_average} / 10
                    </p>
                    <Link
                      to={{
                        pathname: `/singlemovie/${title.replace(/\s/g, "")}`,
                        state: {
                          title,
                          id,
                          poster_path,
                          overview,
                          vote_average,
                          original_language,
                          popularity,
                        },
                      }}
                      className="link__viewmovie"
                    >
                      View movie
                    </Link>
                    <button onClick={() => handleAddToWatch(id)}>
                      Add to Watch list
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="pages__wrapper">
              <button
                onClick={handlePrevPageBtn}
                disabled={pageNumber === 1 ? true : false}
              >
                <i className="fas fa-arrow-alt-circle-left"></i>
              </button>
              <h4 style={{ color: "white" }}>Page number: {pageNumber}</h4>
              <button onClick={handleNextPageBtn}>
                <i className="fas fa-arrow-alt-circle-right"></i>
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default MovieList;

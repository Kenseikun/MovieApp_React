import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MovieList from "../components/MovieList/MovieList";
import WatchList from "../components/WatchList/WatchList";
import NavBarTemplate from "../components/templates/NavBarTemplate";
import { routes } from "../routes";
import SingleMovie from "../pages/SingleMovie/SingleMovie";
import "./App.scss";

class App extends Component {
  state = {
    movies: [],
    watchList: [],
    inputSearch: "",
    moviesAfterSearch: [],
    isActiveBtn: true,
    pageNumber: 1,
    sortedBtnActive: true,
  };

  // apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=b58541d0d1fdb2d8ee6fe348f0588057&language=en-US&page=${this.state.pageNumber}`;

  componentDidMount() {
    this.getMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.inputSearch !== this.state.inputSearch) {
      this.filterMovieSearch();
    }

    if (prevState.pageNumber !== this.state.pageNumber) {
      this.getMovies();
    }
  }

  getMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=b58541d0d1fdb2d8ee6fe348f0588057&language=en-US&page=${this.state.pageNumber}`
      )
      .then((response) => {
        console.log(response);
        this.setState({
          movies: [...response.data.results],
          moviesAfterSearch: [...response.data.results],
        });
      })
      .catch((error) => console.log(error));
  };

  handleAddToWatch = (movieId) => {
    // const moviesFiltered = this.state.movies.filter((movie) => {
    //   return movie.id === movieId;
    //   // if (movie.id === movieId) {
    //   //   return movie;
    //   // }
    // });

    const movieFind = this.state.movies.find((movie) => {
      return movie.id === movieId;
    });
    // this.setState({
    //   watchList: [...this.state.watchList, ...moviesFiltered],
    // });

    this.setState({
      watchList: [...new Set([...this.state.watchList, movieFind])],
    });
  };

  deletMovieFromWatchList = (movieId) => {
    const watchListFiltered = this.state.watchList.filter((movie) => {
      return movie.id !== movieId;
    });
    this.setState({
      watchList: [...watchListFiltered],
    });
  };

  handleinputSearch = (e) => {
    this.setState({
      inputSearch: e.target.value,
    });
  };

  filterMovieSearch = () => {
    if (this.state.inputSearch !== "") {
      // const filteredMovies = this.state.movies.filter((movie) => {
      //   const tempMovieNameFilter = movie.title.toLowerCase();
      //   const tempInputValue = this.state.inputSearch.toLocaleLowerCase();
      //   return tempMovieNameFilter.includes(tempInputValue);
      // });

      const filteredMovies = this.state.movies.filter((movie) => {
        // const tempMovieNameFilter = movie.title.toLowerCase();
        // const tempInputValue = this.state.inputSearch.toLocaleLowerCase();
        // return tempMovieNameFilter.includes(tempInputValue);

        return (
          movie.title.toLowerCase().slice(0, this.state.inputSearch.length) ===
          this.state.inputSearch.toLocaleLowerCase()
        );
      });

      this.setState({
        moviesAfterSearch: [...filteredMovies],
      });
    } else {
      this.setState({
        moviesAfterSearch: [...this.state.movies],
      });
    }
  };

  handleTargetMenuStyle = (e) => {
    console.log(e.target);
    // e.target.className = "active__btn";
    // JAK ZROBIC ZEBY TYLKO BTN ??
    // e.target.matches(button)
  };

  handleNextPageBtn = () => {
    this.setState((prevState) => ({
      pageNumber: (prevState.pageNumber += 1),
    }));
  };

  handlePrevPageBtn = () => {
    this.setState((prevState) => ({
      pageNumber: (prevState.pageNumber -= 1),
    }));
  };

  handleSortBtn = () => {
    //Dla Cwiczen
    // const sortedMovies = this.state.moviesAfterSearch.sort(a,b)
    const newMovies = [...this.state.moviesAfterSearch];
    newMovies.reverse();

    this.setState((prevState) => ({
      moviesAfterSearch: [...newMovies],
      sortedBtnActive: !prevState,
    }));
  };

  //TODO: .env

  render() {
    return (
      <div className="app__container">
        <BrowserRouter>
          <NavBarTemplate
            watchList={this.state.watchList}
            inputSearch={this.state.inputSearch}
            handleinputSearch={this.handleinputSearch}
            handleTargetMenuStyle={this.handleTargetMenuStyle}
          >
            <Switch>
              <Route exact path={routes.home}>
                <MovieList
                  movies={this.state.movies}
                  handleAddToWatch={this.handleAddToWatch}
                  moviesAfterSearch={this.state.moviesAfterSearch}
                  pageNumber={this.state.pageNumber}
                  handleNextPageBtn={this.handleNextPageBtn}
                  handlePrevPageBtn={this.handlePrevPageBtn}
                  handleSortBtn={this.handleSortBtn}
                  sortedBtnActive={this.sortedBtnActive}
                />
              </Route>
              <Route path={routes.watchList}>
                <WatchList
                  watchList={this.state.watchList}
                  deletMovieFromWatchList={this.deletMovieFromWatchList}
                />
              </Route>
              {/* <Route path={routes.singleMovie}>
              <SingleMovie />
            </Route> */}
              <Route
                path={routes.singleMovie}
                render={(props) => (
                  <SingleMovie
                    {...props}
                    handleAddToWatch={this.handleAddToWatch}
                  />
                )}
              />
            </Switch>
          </NavBarTemplate>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

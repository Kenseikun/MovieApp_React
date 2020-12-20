import React from "react";
import { NavLink } from "react-router-dom";
import { routes } from "../../routes";
import "./NavBar.scss";

const activeNavLinkStyles = {
  backgroundColor: "#475a96",
};

const NavBar = ({
  watchList,
  inputSearch,
  handleinputSearch,
  handleTargetMenuStyle,
}) => {
  return (
    <>
      <nav className="nav__wrapper" onClick={(e) => handleTargetMenuStyle(e)}>
        <ul>
          <li>
            <NavLink
              activeStyle={activeNavLinkStyles}
              className="text__link"
              exact
              to={routes.home}
            >
              TOP rated movies
            </NavLink>
          </li>
          <li>
            <NavLink
              activeStyle={activeNavLinkStyles}
              className="text__link"
              exact
              to={routes.watchList}
            >
              Watch List : {watchList.length}
            </NavLink>
          </li>
        </ul>
        <div className="input__wrapper">
          <input
            type="search"
            id="search__movie"
            name="searchMovieInput"
            placeholder="Search..."
            value={inputSearch}
            onChange={handleinputSearch}
          />
        </div>
      </nav>
    </>
  );
};

export default NavBar;

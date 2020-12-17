import React from "react";
import NavBar from "../NavBar/NavBar";

const NavBarTemplate = ({
  children,
  watchList,
  inputSearch,
  handleinputSearch,
  handleTargetMenuStyle,
}) => {
  return (
    <>
      <NavBar
        watchList={watchList}
        inputSearch={inputSearch}
        handleinputSearch={handleinputSearch}
        handleTargetMenuStyle={handleTargetMenuStyle}
      />
      {children}
    </>
  );
};

export default NavBarTemplate;

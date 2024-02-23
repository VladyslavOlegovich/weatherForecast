/* eslint-disable react/prop-types */
import { useState } from "react";
import classes from "./SearchInput.module.css";
const SearchInput = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    onSearch(value);
  };
  return (
    <div className={classes.inputContainer}>
      <input
        className={classes.searchInput}
        type="text"
        placeholder="Search your trip"
        value={searchTerm}
        onChange={handleChange}
      />
      <div className={classes.searchIcon}>
        <img
          className={classes.img}
          src="./icons/search-icon.png"
          alt="search"
        />
      </div>
    </div>
  );
};

export default SearchInput;

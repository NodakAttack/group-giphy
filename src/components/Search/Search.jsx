import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Search = () => {
  const dispatch = useDispatch();
  const theGifs = useSelector((store) => store.gifList);

  const [search, setSearch] = useState("panda");

  useEffect(() => {
    dispatch({ type: "FETCH_GIFS", payload: search });
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  };

  const handleSearchClick = () => {
    dispatch({ type: "FETCH_GIFS", payload: search });
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter a search term"
          value={search}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearchClick}>Search</button>
      </div>
      {theGifs.map((gif) => {
        return (
          <img key={gif.id} src={gif.images.fixed_height.url} alt={gif.title} />
        );
      })}
    </div>
  );
};

export default Search;

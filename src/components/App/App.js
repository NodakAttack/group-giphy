import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const theGifs = useSelector((store) => store.gifList);

  let search = "panda"

  useEffect(() => {
    dispatch({ type: "FETCH_GIFS", payload: search});
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">APIS</h1>
        <h4>
          <i>APIS</i>

          {theGifs.map((gif) => {
            return (
              <img
                key={gif.id}
                src={gif.images.fixed_height.url}
                alt={gif.title}
              />
            );
          })}
        </h4>
      </header>
      <br />
    </div>
  );
}

export default App;

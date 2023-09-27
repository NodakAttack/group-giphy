import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const [theGifs, setTheGifs] = useState([]);

  useEffect(() => {
    fetchGifs();
  }, []);

  const search = "coding"


  const fetchGifs = () => {
    console.log("running fetchGifs");
    axios
      .get("/gifs", {
        params: {
          search: search,
        },
      })
      .then((response) => {
        const apiResponse = response.data;
        console.log("API response: ", apiResponse.data);
        setTheGifs(apiResponse.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">APIS</h1>
        <h4>
          <i>APIS</i>

          {theGifs.map((gif) => {
            return <img key={gif.id} src={gif.images.fixed_height.url} alt={gif.title} />;
          })}
        </h4>
      </header>
      <br />
    </div>
  );
}

export default App;

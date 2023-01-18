import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from 'react';

import './App.css';

const APIKEY = "";

function App() {
  // const [movie, setMovie] = useState(undefined);
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState(undefined);
  const link = `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=en-US&query=james+bond&page=1&include_adult=false`;

  useEffect(() => {
    fetch(link)
      .then((response) => {
        if (response.status === 404) {
          return "something happened and we couldn't get the file";
        }
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        setMovies(data?.results);
      })
      .catch((error) => {
        console.log(error)
      });
  }, []);

  useEffect(() => {
    console.log("in useEffect, genre: ", genre);
  }, [genre]);

  console.log("movies", movies);

  return (
    <div className="App" style={{margin: "20px" }}>
      Movie app through IMDB
      <button onClick={() => setGenre("action")}>
        Action
      </button>
      <button onClick={() => setGenre("sci-fi")}>
        sci-fi
      </button>
      {/* <img
        alt=""
        src={`https://image.tmdb.org/t/p/w500${movie && movie.poster_path}`}
      /> */}
      <ul>
        {movies.map((movie) =>
          <li>{movie.original_title}</li>
        )}
      </ul>
    </div>
  );
}

export default App;


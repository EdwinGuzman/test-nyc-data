import TextField from "@mui/material/TextField";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useState, useEffect } from 'react';

import './App.css';

const APIKEY = "";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const link = `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`;

  useEffect(() => {
    fetch(link)
      .then((response) => {
        if (response.status === 404) {
          return "something happened and we couldn't get the file";
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setMovies(data?.results);
      })
      .catch((error) => {
        console.log(error)
      });
  }, [link]);

  return (
    <div className="App" style={{margin: "20px" }}>
      Movie app through IMDB
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Movie Query"
          variant="outlined"
          value={searchQuery}
          onChange={(event) => {
            console.log("input value", event.target.value)
            setSearchQuery(event.target.value)
          }}
        />
      </Box>
      <List>
        {movies.map((movie) => {
          console.log("movie", movie);
          return <ListItem>{movie.original_title}</ListItem>
        })}
      </List>
    </div>
  );
}

export default App;


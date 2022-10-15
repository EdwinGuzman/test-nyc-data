import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from 'react';

import './App.css';
import DataList from './DataList';

function App() {
  const leadingCauseOfDeathData = "https://data.cityofnewyork.us/resource/jb7j-dtam.json";
  const [deathData, setDeathData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRace, setSelectedRace] = useState("none");

  useEffect(() => {
    fetch(leadingCauseOfDeathData)
      .then((response) => {
        if (response.status === 404) {
          return "something happened and we couldn't get the file";
        }
        return response.json()
      })
      .then((data) => {
        // console.log(data)
        setDeathData(data);
        setFilteredData(data);
      })
      .catch((error) => {
        console.log(error)
      });
  }, []);

  function filterData(dataProperty, filterValue) {
    if (filterValue === "none") {
      setFilteredData(deathData);
    } else {
      const newData = deathData.filter((data) => {
        if (data[dataProperty] === filterValue) {
          return true;
        }
        return false;
      });

      setFilteredData(newData);
    }
  }

  return (
    <div className="App" style={{margin: "20px" }}>
      <FormControl variant="filled">
        <InputLabel id="select-race-label">Race Ethnicity</InputLabel>
        <Select
          labelId="select-race-label"
          id="select-race-id"
          value={selectedRace}
          label="Age"
          onChange={(value) => {
            filterData("race_ethnicity", value.target.value);
            setSelectedRace(value.target.value);
          }}
          autoWidth
        >
          <MenuItem value="none">---</MenuItem>
          <MenuItem value="Other Race/Ethnicity">Other Race/Ethnicity</MenuItem>
          <MenuItem value="Asian and Pacific Islander">Asian and Pacific Islander</MenuItem>
          <MenuItem value="Non-Hispanic Black">Non-Hispanic Black</MenuItem>
          <MenuItem value="Hispanic">Hispanic</MenuItem>
          <MenuItem value="Non-Hispanic White">Non-Hispanic White</MenuItem>
          <MenuItem value="Not Stated/Unknown">Not Stated/Unknown</MenuItem>
        </Select>
      </FormControl>

      <label htmlFor="select-sex">Sex</label>
      <select
        id="select-sex"
        onChange={(value) => {
          filterData("sex", value.target.value);
        }}
      >
        <option value="none">----</option>
        {/* TODO: Optimize this by making a dynamic list when
            the data is received. */}
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="M">M</option>
        <option value="F">F</option>
      </select>

      <h1>Leading Causes of Deaths in NYC</h1>
      <DataList data={filteredData} test="Testing" test2="Testing2" /> 
      
    </div>
  );
}

export default App;

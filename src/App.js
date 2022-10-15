import { useState, useEffect } from 'react';

import './App.css';
import DataList from './DataList';

function App() {
  const leadingCauseOfDeathData = "https://data.cityofnewyork.us/resource/jb7j-dtam.json";
  const [deathData, setDeathData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

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
    <div className="App">
      <label htmlFor="select-race-ethnicity">Race Ethnicity</label>
      <select
        id="select-race-ethnicity"
        onChange={(value) => {
          filterData("race_ethnicity", value.target.value);
        }}
      >
        <option value="none">----</option>
        {/* TODO: Optimize this by making a dynamic list when
            the data is received. */}
        <option value="Other Race/Ethnicity">Other Race/Ethnicity</option>
        <option value="Asian and Pacific Islander">Asian and Pacific Islander</option>
        <option value="Non-Hispanic Black">Non-Hispanic Black</option>
        <option value="Hispanic">Hispanic</option>
        <option value="Non-Hispanic White">Non-Hispanic White</option>
        <option value="Not Stated/Unknown">Not Stated/Unknown</option>
      </select>
      <h1>Leading Causes of Deaths in NYC</h1>
      <DataList data={filteredData} test="Testing" test2="Testing2" /> 
      
    </div>
  );
}

export default App;

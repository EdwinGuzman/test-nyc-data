import { useState, useEffect } from 'react';

import './App.css';

function App() {
  const leadingCauseOfDeathData = "https://data.cityofnewyork.us/resource/jb7j-dtam.json";
  const [deathData, setDeathData] = useState([]);

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
        setDeathData(data)
      })
      .catch((error) => {
        console.log(error)
      });
  }, []);

  return (
    <div className="App">
      <ul>
        {
          deathData.map((deathObject, index) => {
            // age_adjusted_death_rate
            // death_rate
            // deaths
            // leading_cause
            // race_ethnicity
            // sex
            // year
            return (
              <li key={index}>
                <p>Leading Cause: {deathObject.leading_cause}</p>
                <p>Year: {deathObject.year}</p>
                <p>Race Ethnicity: {deathObject.race_ethnicity}</p>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default App;

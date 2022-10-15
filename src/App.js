import { useState, useEffect } from 'react';

import './App.css';
import DataList from './DataList';

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
        console.log(data)
        setDeathData(data)
      })
      .catch((error) => {
        console.log(error)
      });
  }, []);

  return (
    <div className="App">
      <h1>Leading Causes of Deaths in NYC</h1>
      <DataList data={deathData} test="Testing" test2="Testing2" /> 
      
    </div>
  );
}

export default App;

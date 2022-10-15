function DataList(props) {
  // console.log("These are the props",props);
  const deathData = props.data || [];
  return (
    <table>
      <thead>
        <tr>
          <th>Count</th>
          <th>Age Adjusted Death Rate</th>
          <th>Death Rate</th>
          <th>Death</th>
          <th>Leading cause</th>
          <th>Race Ethnicity</th>
          <th>Sex</th>
          <th>Year</th>
        </tr>
      </thead>
      <tbody>
        {deathData.map((deathObject, index) => {
          return (
            <tr key={index}>
              <td>{index}</td>
              <td>{deathObject.age_adjusted_death_rate}</td>
              <td>{deathObject.death_rate}</td>
              <td>{deathObject.deaths}</td>
              <td>{deathObject.leading_cause}</td>
              <td>{deathObject.race_ethnicity}</td>
              <td>{deathObject.sex} </td>
              <td>{deathObject.year}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  );
}

export default DataList;

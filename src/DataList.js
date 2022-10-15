function DataList(props) {
    console.log("These are the props",props);
    const deathData = props.data || [];
    return <ul>
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
                <p>Deaths: {deathObject.deaths} </p>

              </li>
            )
          })
        }
      </ul>
    ;
}

export default DataList;

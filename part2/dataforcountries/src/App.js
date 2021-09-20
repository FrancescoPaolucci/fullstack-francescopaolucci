import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [countries, SetCountries] = useState([]);
  const [filteredData, setFilteredData] = useState(countries);
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("effect");
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => {
        console.log("promise fulfilled");
        SetCountries(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.log("Error" + error);
      });
  }, []);

  const handleFind = (e) => {
    let value = e.target.value.toLowerCase();
    let result = [];
    console.log("value:", value);
    result = countries.filter((data) => {
      return data.name.toLowerCase().indexOf(value) !== -1;
    });
    setFilteredData(result);
    if (result.length > 10) {
      console.log("Ghawad");
      setMessage("Too many matches, specify another filter");
    } else if (result.length < 10 && result.length > 1) {
      console.log("Not Ghawad");
      setMessage("Your filtered results");
    } else if (result.length === 1) {
      setMessage("only one:");
    }
  };

  console.log("render", countries.length, "notes");
  return (
    <div className="App">
      <div style={{ margin: "0 auto", marginTop: "10%" }}>
        <label>Search:</label>
        <input type="text" onChange={(e) => handleFind(e)} />
        <p>{message}</p>
      </div>
      <div style={{ padding: 10 }}>
        {filteredData.map((value, index) => {
          return (
            <div style={styles} key={value.numericCode}>
              <div style={styles}>{value.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
const styles = {
  display: "inline",
  width: "30%",
  height: 50,
  float: "left",
  padding: 5,
  border: "0.5px solid black",
  marginBottom: 10,
  marginRight: 10,
};
export default App;

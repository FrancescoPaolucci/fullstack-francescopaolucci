import React, { useState, useEffect } from "react";
import axios from "axios";
const api_key = process.env.REACT_APP_API_KEY;
console.log("YA KEY", api_key);
const OneComp = (props) => {
  return (
    <div>
      <h1> {props.name} </h1>
      <p> Capital: {props.capital} </p>
      <p> population: {props.population}</p>
      <h2> languages: </h2>
      <ul>
        {props.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={props.flag} alt={props.name} height="100px" />
    </div>
  );
};

function App() {
  const [countries, SetCountries] = useState([]);
  const [selCountry, setSelCountry] = useState("Rome");
  const [filteredData, setFilteredData] = useState([]);
  const [message, setMessage] = useState("");
  const [weather, setWeather] = useState({});

  useEffect(() => {
    console.log("effect");
    axios
      .get("https://restcountries.com/v2/all")
      .then((response) => {
        console.log("promise fulfilled");
        SetCountries(response.data);
      })
      .catch((error) => {
        console.log("Error" + error);
      });
  }, []);

  useEffect(() => {
    console.log("effect");
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${selCountry}&appid=${api_key}`
      )
      .then((response) => {
        console.log("promise fulfilled");
        setWeather(response.data);
      })
      .catch((error) => {
        console.log("Error" + error);
      });
  }, []);

  const handleShowButton = (e) => {
    const result = countries.filter((value) => {
      return value.capital === e.target.value;
    });
    console.log("@@@@@@", result[0].capital);
    setSelCountry(result[0].capital);
    setFilteredData(result);
  };

  const handleFind = (e) => {
    let value = e.target.value.toLowerCase();
    let result = [];
    console.log("value:", value);
    result = countries.filter((data) => {
      return data.name.toLowerCase().indexOf(value) !== -1;
    });
    if (result.length > 10) {
      console.log("Ghawad");
      setMessage("Too many matches, specify another filter");
      setFilteredData([]);
    } else if (result.length < 10 && result.length > 1) {
      console.log("Not Ghawad");
      setFilteredData(result);
      setMessage("Your filtered results");
    } else if (result.length === 1) {
      setMessage("only one:");
      setFilteredData(result);
      setSelCountry(result[0].capital);
      console.log("@@@@@@", result[0].capital);
    } else if (result.length === 0) {
      setMessage("No results sry");
      setFilteredData([]);
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
          console.log("######", filteredData.length);

          if (filteredData.length !== 1) {
            return (
              <div style={styles} key={value.callingCodes}>
                <div style={styles}>{value.name}</div>
                <button value={value.capital} onClick={handleShowButton}>
                  SHOW
                </button>
              </div>
            );
          } else {
            return (
              <div>
                <OneComp
                  name={value.name}
                  capital={value.capital}
                  population={value.population}
                  languages={value.languages}
                  flag={value.flags[0]}
                />
                <h2>Weather in {value.capital}</h2>
                <h1>{weather.main.description}</h1>
                <p>temperature {weather.main.temp} Celcius</p>
                <p>Wind: {weather.main.wind}</p>
              </div>
            );
          }
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

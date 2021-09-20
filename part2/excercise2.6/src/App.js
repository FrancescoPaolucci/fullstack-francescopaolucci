import React, { useState, useEffect } from "react";
import noteService from "./services/serv";
import axios from "axios";
import "./index.css";
const Error = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="error">{message}</div>;
};

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="notification">{message}</div>;
};

const Button = (props) => {
  return (
    <button onClick={props.onClick} type={props.type}>
      {props.text}
    </button>
  );
};
const Input = (props) => {
  return <input value={props.value} onChange={props.onChange} />;
};
const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [notificationMessage, setnotificatioMessage] = useState(null);
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterData, setFilterData] = useState(persons);
  const found = persons.some((el) => el.name === newName);

  useEffect(() => {
    noteService.getAll().then((response) => {
      setPersons(response.data);
      setFilterData(response.data);
    });
  }, []);
  console.log("render", persons.length);

  const addPerson = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    found
      ? window.alert("NAME ALREADY EXIST")
      : noteService.create(personObject).then((response) => {
          setPersons(persons.concat(response.data));
          setFilterData(persons.concat(response.data));
          setNewName("");
          setNewNumber("");
          setnotificatioMessage(` person: ${newName} was added correctly`);
          setTimeout(() => {
            setnotificatioMessage(null);
          }, 5000);
        });
  };

  const handlNameChange = (e) => {
    console.log(e.target.value);
    setNewName(e.target.value);
  };
  const handlNumberChange = (e) => {
    console.log(e.target.value);
    setNewNumber(e.target.value);
  };
  const handleNameFilter = (e) => {
    console.log(e.target.value);
    let filterLow = e.target.value.toLowerCase();
    let result = [];
    console.log(filterLow);
    const arrLow = persons.map((persons) => persons.name.toLowerCase());
    console.log(arrLow);
    const includes = arrLow.includes(filterLow);
    console.log("INCLUDES", includes);

    result = persons.filter((data) => {
      return data.name.toLowerCase().indexOf(filterLow) !== -1;
    });
    setFilterData(result);
  };

  const deletePersonOf = (id) => {
    const url = `http://localhost:3001/persons/${id}`;
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Do you really want to delete? ${person.name}`)) {
      noteService
        .elimina(id)
        .then((res) => {
          console.log(res);
          const persond = persons.filter((p) => p.id !== id);
          setFilterData(persond);
          setnotificatioMessage(` person: ${newName} was deleted correctly`);
          setTimeout(() => {
            setnotificatioMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage(`person: ${person.name} was already deleted`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  const Show = ({ persons, deletePerson }) => {
    return (
      <li>
        {" "}
        {persons.name} : {persons.number}{" "}
        <button onClick={deletePerson}> X </button>
      </li>
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Error message={errorMessage} />
      <Notification message={notificationMessage} />
      <form>
        <div>
          <p>
            filter by name:{" "}
            <Input type="text" onChange={(e) => handleNameFilter(e)} />
          </p>
        </div>
      </form>
      <form>
        <div>
          name: <Input value={newName} onChange={handlNameChange} />
          <p>
            number: <Input value={newNumber} onChange={handlNumberChange} />
          </p>
        </div>
        <div>debug: {newName}</div>
        <div>debug: {newNumber}</div>
        <div>
          <Button onClick={addPerson} type="submit" text="ADD" />
        </div>
        <h1> Numbers </h1>
      </form>
      <ul>
        {filterData.map((persons) => (
          <Show
            key={persons.id}
            persons={persons}
            deletePerson={() => deletePersonOf(persons.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;

import React, { useState } from "react";

const App = () => {
  const [selected, setSelected] = useState(0);
  const [maxsel, setMaxsel] = useState(0);
  const [vote, setVote] = useState([0, 0, 0, 0, 0, 0, 0]);
  const copy = [...vote];

  const handleAnte = () => {
    const rand = Math.random() * (7 - 0) + 0;
    setSelected(Math.trunc(rand));
    console.log(Math.trunc(rand));
  };
  const handleVote = () => {
    copy[selected] += 1;
    setVote([...copy]);
    console.log(copy);
  };
  const Maxvote = () => {
    setMaxsel(copy.indexOf(Math.max(...copy)));
    return <p> {anecdotes[maxsel]}</p>;
  };

  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p> has {vote[selected]} votes</p>
      <button onClick={handleAnte}> Next Anecdote </button>{" "}
      <button onClick={handleVote}> Vote!</button>
      <h1>Anecdote with most votes</h1>
      <Maxvote />
    </div>
  );
};

export default App;

import React, { useState } from "react";

const Statistics = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        {" "}
        <h1>No feedback given !</h1>
      </div>
    );
  }
  return (
    <div>
      <h1> STATISTICS: </h1>
      <StatisticsLine text="GOOD" value={props.good} />
      <StatisticsLine text="NEUTRAL" value={props.neutral} />
      <StatisticsLine text="BAD" value={props.bad} />
      <StatisticsLine
        text="ALL"
        value={props.good + props.neutral + props.bad}
      />
      <StatisticsLine
        text="AVERAGE"
        value={props.calcAverage(props.good, props.neutral, props.bad)}
      />
      <StatisticsLine
        text="Positive"
        value={props.calcPosi(props.good, props.neutral, props.bad)}
      />
    </div>
  );
};
const StatisticsLine = (props) => {
  return (
    <table>
      <tbody>
        <tr text={props.text} value={props.value}>
          <td>{props.text}:</td>
          <td>{props.value}</td>
        </tr>
        <tr>
          <td>__________</td>
        </tr>
      </tbody>
    </table>
  );
};

const ButtonComp = (props) => {
  return (
    <button onClick={props.func} name={props.name}>
      {props.name}
    </button>
  );
};
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allClicks, setAll] = useState([]);

  const handleGood = () => {
    setAll(allClicks.concat("G"));
    setGood(good + 1);
  };

  const handleNeutral = () => {
    setAll(allClicks.concat("N"));
    setNeutral(neutral + 1);
  };
  const handleBad = () => {
    setAll(allClicks.concat("B"));
    setBad(bad + 1);
  };

  const calcAverage = (good, neutral, bad) => {
    let g = good * 1;
    let b = bad * -1;
    let all = good + neutral + bad;
    let average = (g + b) / all;
    return average;
  };
  const calcPosi = (good, neutral, bad) => {
    let all = good + neutral + bad;
    let perc = (good * 100) / all;
    let perc1 = [perc, "%"];
    return perc1;
  };

  return (
    <div>
      <h1> Give feedback </h1>
      <ButtonComp func={handleGood} name="GOOD" />
      <ButtonComp func={handleNeutral} name="NEUTRAL" />
      <ButtonComp func={handleBad} name="BAD" />
      <div>
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          calcAverage={calcAverage}
          calcPosi={calcPosi}
          allClicks={allClicks}
        />
        <p>{allClicks.join(" ")}</p>
      </div>
    </div>
  );
};

export default App;

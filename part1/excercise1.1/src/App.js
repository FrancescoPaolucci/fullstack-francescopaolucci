import React from "react";
const Header = (props) => {
  return (
    <div>
      <p> {props.courseName} </p>
    </div>
  );
};
const Content = (props) => {
  return (
    <div>
      <Parts
        part={props.course.parts[0].name}
        exNum={props.course.parts[0].exercises}
      />
      <Parts
        part={props.course.parts[1].name}
        exNum={props.course.parts[1].exercises}
      />
      <Parts
        part={props.course.parts[2].name}
        exNum={props.course.parts[2].exercises}
      />
    </div>
  );
};
const Total = (props) => {
  return (
    <div>
      <p> Total Number of excercises is:{props.num1}</p>
    </div>
  );
};

const Parts = (props) => {
  return (
    <div>
      <p> {props.part} </p>
      <p> Exercises: {props.exNum} </p>
    </div>
  );
};

const App = (props) => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  return (
    <div>
      <Header courseName={course.name} />
      <Content course={course} />
      <Total
        num1={
          course.parts[0].exercises +
          course.parts[1].exercises +
          course.parts[2].exercises
        }
      />
    </div>
  );
};

export default App;

import React from "react";
import Courses from "./components/Course";

/*const Header = (props) => {
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
*/

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
    {
      name: "React-Native.js",
      id: 3,
      parts: [
        {
          name: "Navigator",
          exercises: 19,
          id: 1,
        },
        {
          name: "Components",
          exercises: 10,
          id: 2,
        },
      ],
    },
  ];

  return <Courses courses={courses} />;
};

export default App;

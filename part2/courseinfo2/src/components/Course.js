import React from "react";

const Course = (props) => {
  const { course } = props;
  const tot = course.parts.reduce((a, v) => (a = a + v.exercises), 0);
  return (
    <div>
      <h1>{course.name}</h1>
      <ul>
        {course.parts.map((course) => (
          <li key={course.id}>
            {course.name} {course.exercises}
          </li>
        ))}
      </ul>
      <p>Total of {tot} Exercises</p>
    </div>
  );
};

const Courses = (props) => {
  const { courses } = props;
  return (
    <div>
      <h1>Web development curriculum</h1>
      <ul>
        {courses.map((courses) => (
          <li key={courses.id}>
            <Course course={courses} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;

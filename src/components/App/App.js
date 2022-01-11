import React, { useState, useEffect } from 'react';
import Student from '../Student/Student';
import './App.css';

const App = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [students, setStudents] = useState([]);
  // const [allTags, setAllTags] = useState([]);
  const [nameQuery, setNameQuery] = useState('');
  const [tagQuery, setTagQuery] = useState('');

  // prettier-ignore
  const average = gradeArray => (gradeArray.map(Number)
  .reduce((a, b) => a + b, 0) / gradeArray.length)
  .toFixed(2);

  useEffect(() => {
    fetch('https://api.hatchways.io/assessment/students')
      .then(res => res.json())
      .then(
        result => {
          setIsLoaded(true);
          setStudents(result.students);
        },
        error => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <main>
        <input
          type="search"
          className="name-search"
          placeholder="Search by name"
          value={nameQuery}
          onChange={event => setNameQuery(event.target.value)}
        />
        <input
          type="search"
          className="tag-search"
          placeholder="Search by tag"
          value={tagQuery}
          onChange={event => setTagQuery(event.target.value)}
        />

        <div className="students">
          {students
            .filter(student => {
              if (
                (student.firstName + ' ' + student.lastName)
                  .toLowerCase()
                  .includes(nameQuery.toLowerCase())
              ) {
                return student;
              }
            })
            .map(
              ({
                id,
                pic,
                firstName,
                lastName,
                email,
                company,
                skill,
                grades,
              }) => (
                <Student
                  id={id}
                  pic={pic}
                  firstName={firstName}
                  lastName={lastName}
                  email={email}
                  company={company}
                  skill={skill}
                  grades={grades}
                  average={average}
                />
              )
            )}
        </div>
      </main>
    );
  }
};

export default App;

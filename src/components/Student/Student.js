import React, { useState } from 'react';
import Grades from '../Grades/Grades';
import './Student.css';

const Student = ({
  id,
  pic,
  firstName,
  lastName,
  email,
  company,
  skill,
  grades,
  average,
}) => {
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);

  const onKeyDown = event => {
    const trimmedInput = tagInput.trim();

    if (
      event.keyCode === 13 &&
      trimmedInput.length &&
      !tags.includes(trimmedInput)
    ) {
      event.preventDefault();
      setTags(prevState => [...prevState, trimmedInput]);
      setTagInput('');
    }
  };

  const deleteTag = i => {
    setTags(prevState => prevState.filter((tag, index) => index !== i));
  };

  return (
    <>
      <div className="student" key={id}>
        <img className="student-picture" src={pic} alt="student" />
        <div className="student-info">
          <h1 className="student-name">
            {firstName.toUpperCase()} {lastName.toUpperCase()}
          </h1>

          <div className="student-info-section">
            <p>Email: {email}</p>
            <p>Company: {company}</p>
            <p>Skill: {skill}</p>
            <p>Average: {average(grades)}%</p>
          </div>

          <Grades>
            {grades.map((grade, i) => (
              <p className="student-grade" key={i}>
                Test {i + 1}: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {grade}%
              </p>
            ))}
          </Grades>

          <div className="student-tag-section">
            {tags.map((tag, i) => (
              <div className="student-tag">
                {tag}
                <button onClick={() => deleteTag(i)}>x</button>
              </div>
            ))}

            <input
              className="student-tag-input"
              value={tagInput}
              placeholder="Add a tag"
              onKeyDown={onKeyDown}
              onChange={event => setTagInput(event.target.value)}
            />
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Student;

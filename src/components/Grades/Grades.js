import React, { useState } from 'react';
import './Grades.css';

const Grades = ({ collapsed, children }) => {
  const [isCollapsed, setIsCollapsed] = useState(!collapsed);

  return (
    <>
      <button
        className="grades-button"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? '+' : '--'}
      </button>

      <div
        className={`grades ${isCollapsed ? 'collapsed' : 'expanded'}`}
        aria-expanded={isCollapsed}
      >
        {children}
      </div>
    </>
  );
};

export default Grades;

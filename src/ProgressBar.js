import React from 'react';

import './ProgressBar.css';

const ProgressBar = ({ percent }) => {
  const wholePercent = Math.round(percent * 100);

  const fillStyle = {
    width: `${wholePercent}%`,
  };

  return (
    <div className="progress-bar">
      <div className="progress-bar-fill" style={fillStyle} />
    </div>
  );
};

export default ProgressBar;

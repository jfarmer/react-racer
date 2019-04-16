import React from 'react';

const eventTargetValue = e => e.target.value;
const handleTypingEventWith = fn => e => fn(eventTargetValue(e));

const TypingInput = ({ onInputChange }) => {
  const handleTypingEvent = handleTypingEventWith(onInputChange);

  return (
    <textarea onChange={handleTypingEvent}></textarea>
  );
};

export default TypingInput;

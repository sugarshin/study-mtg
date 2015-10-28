import React, { PropTypes } from 'react';

export default function Timer(props) {
  const { hours, minutes, seconds, milliseconds } = props;
  return (
    <div>
      <span>{hours}</span>
      <span>:</span>
      <span>{minutes}</span>
      <span>:</span>
      <span>{seconds}</span>
      <span>.</span>
      <span>{milliseconds}</span>
    </div>
  );
}

Timer.propTypes = {
  hours: PropTypes.number.isRequired,
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
  milliseconds: PropTypes.number.isRequired
};

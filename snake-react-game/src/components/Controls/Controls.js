import React from 'react';
import classes from './Controls.module.css';

const Controls = (props) => {
  return (
    <div className={classes.controls__wrapper}>
      <div className={classes.controls__score}>Score: {props.score}</div>
      <button
        onClick={props.clicked}
        className={classes['controls__start-btn']}
      >
        Start Game
      </button>
    </div>
  );
};

export default Controls;

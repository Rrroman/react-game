import React from 'react';
import classes from './Snake.module.css';

const Snake = (props) => {
  return (
    <div>
      {props.snakeStartPosition.map((cell, index) => {
        const StartPositionStyles = {
          left: `${cell[0]}%`,
          top: `${cell[1]}%`,
        };
        return (
          <div
            key={index}
            className={classes.snake__cell}
            style={StartPositionStyles}
          ></div>
        );
      })}
    </div>
  );
};

export default Snake;

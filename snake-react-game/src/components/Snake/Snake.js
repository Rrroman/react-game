import React from 'react';
import classes from './Snake.module.css';

const Snake = (props) => {
  return (
    <div>
      {props.snakeCoordinates.map((cell, index) => {
        const coordinatesStyles = {
          left: `${cell[0]}%`,
          top: `${cell[1]}%`,
        };
        return (
          <div
            key={index}
            className={classes.snake__cell}
            style={coordinatesStyles}
          ></div>
        );
      })}
    </div>
  );
};

export default Snake;

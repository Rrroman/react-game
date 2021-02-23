import React from 'react';
import classes from './Snake.module.css';

const Snake = (props) => {
  return (
    <div>
      {props.snakePosition.map((snakePiece, index) => {
        const StartPositionStyles = {
          left: `${snakePiece[0]}%`,
          top: `${snakePiece[1]}%`,
        };
        return (
          <div
            key={index}
            className={classes.snake__piece}
            style={StartPositionStyles}
          ></div>
        );
      })}
    </div>
  );
};

export default Snake;

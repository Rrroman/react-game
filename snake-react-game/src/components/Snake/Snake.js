import React from 'react';
import classes from './Snake.module.css';
import constants from '../../constants/constants';

const Snake = (props) => {
  return (
    <div>
      {props.snakePosition.map((snakePiece, index, arr) => {
        const StartPositionStyles = {
          left: `${snakePiece[0]}%`,
          top: `${snakePiece[1]}%`,
          width: `${props.size}%`,
          height: `${props.size}%`,
          transform: `${
            props.direction === constants.LEFT
              ? 'rotate(90deg)'
              : props.direction === constants.TOP
              ? 'rotate(180deg)'
              : props.direction === constants.RIGHT
              ? 'rotate(270deg)'
              : 'rotate(0deg)'
          }`,
        };
        return index === arr.length - 1 ? (
          <div
            key={index}
            className={`${classes.snake__piece} ${classes.snake__head} ${
              props.isGameOver ? classes.snake__head_dead : ''
            }`}
            style={StartPositionStyles}
          ></div>
        ) : (
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

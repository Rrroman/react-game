import React from 'react';
import classes from './Fruit.module.css';

const Fruit = (props) => {
  const fruitPositionStyle = {
    left: `${props.fruitPosition}%`,
    top: `${props.fruitPosition}%`,
  };
  return <div className={classes.fruit} style={fruitPositionStyle}></div>;
};

export default Fruit;

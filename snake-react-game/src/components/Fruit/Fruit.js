import React from 'react';
import classes from './Fruit.module.css';

const Fruit = (props) => {
  const fruitPositionStyle = {
    left: `${props.fruitPosition[0]}%`,
    top: `${props.fruitPosition[1]}%`,
  };
  return <div className={classes.fruit} style={fruitPositionStyle}></div>;
};

export default Fruit;
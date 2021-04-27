import React from 'react';
import classes from './Fruit.module.css';
import apple from '../../assets/apple-compressed.svg';
import banana from '../../assets/banana-compressed.svg';

const Fruit = (props) => {
  const fruitPositionStyle = {
    left: `${props.fruitPosition[0]}%`,
    top: `${props.fruitPosition[1]}%`,
    width: `${props.size}%`,
    height: `${props.size}%`,
    backgroundImage: `url(${props.isBanana ? banana : apple})`,
  };
  return <div className={classes.fruit} style={fruitPositionStyle}></div>;
};

export default Fruit;

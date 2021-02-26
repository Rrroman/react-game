import React from 'react';
import classes from './Hotkeys.module.css';

const Hotkeys = () => {
  return (
    <ul className={classes.list}>
      <li>
        <span className={classes.key}>LEFT:</span> left arrow \ A
      </li>
      <li>
        <span className={classes.key}>UP:</span> up arrow \ W
      </li>
      <li>
        <span className={classes.key}>RIGHT:</span> right arrow \ D
      </li>
      <li>
        <span className={classes.key}>DOWN:</span> down arrow \ S
      </li>
      <li>
        <span className={classes.key}>PAUSE:</span> space
      </li>
      <li>
        <span className={classes.key}>TURBO:</span> hold move button
      </li>
    </ul>
  );
};

export default Hotkeys;

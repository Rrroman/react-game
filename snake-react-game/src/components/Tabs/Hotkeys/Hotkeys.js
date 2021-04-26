import { ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import classes from './Hotkeys.module.css';

const Hotkeys = () => {
  return (
    <ul dense className={classes.list}>
      <ListItem>
        <ListItemText>
          <span className={classes.key}>LEFT:</span> left arrow \ A
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText>
          <span className={classes.key}>UP:</span> up arrow \ W
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText>
          <span className={classes.key}>RIGHT:</span> right arrow \ D
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText>
          <span className={classes.key}>DOWN:</span> down arrow \ S
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText>
          <span className={classes.key}>PAUSE:</span> space
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText>
          <span className={classes.key}>TURBO:</span> hold move button
        </ListItemText>
      </ListItem>
    </ul>
  );
};

export default Hotkeys;

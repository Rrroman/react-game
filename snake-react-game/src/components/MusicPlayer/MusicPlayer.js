import { Container } from '@material-ui/core';
import React from 'react';
import classes from './MusicPlayer.module.css';

const MusicPlayer = (props) => {
  return (
    <Container
      className={classes.music}
      style={props.isMusic ? { display: 'block' } : { display: 'none' }}
    >
      <iframe
        title="music"
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/DIi-pBpXIbE"
        frameBorder="0"
        allow="accelerometer; autoplay;"
        allowFullScreen
        className={classes.music__player}
      ></iframe>
    </Container>
  );
};

export default MusicPlayer;

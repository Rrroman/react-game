import React from 'react';
import classes from './Controls.module.css';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import YouTubeIcon from '@material-ui/icons/YouTube';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';

const Controls = (props) => {
  const volumeIcon = props.isVolume ? (
    <VolumeUpIcon style={{ color: 'white' }}></VolumeUpIcon>
  ) : (
    <VolumeOffIcon style={{ color: 'white' }}></VolumeOffIcon>
  );

  const musicIcon = props.isMusic ? (
    <SubscriptionsIcon style={{ color: 'white' }}></SubscriptionsIcon>
  ) : (
    <YouTubeIcon style={{ color: 'white' }}></YouTubeIcon>
  );

  return (
    <div className={classes.controls__wrapper}>
      <div className={classes.controls__score}>Score: {props.score}</div>
      <button
        onClick={props.clicked}
        className={classes['controls__start-btn']}
      >
        Start Game
      </button>
      <button onClick={props.volumeToggle} className={classes.controls__volume}>
        {volumeIcon}
      </button>
      <button onClick={props.musicToggle} className={classes.controls__volume}>
        {musicIcon}
      </button>
    </div>
  );
};

export default Controls;

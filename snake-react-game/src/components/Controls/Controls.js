import React from 'react';
import classes from './Controls.module.css';
import Button from '@material-ui/core/Button';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import YouTubeIcon from '@material-ui/icons/YouTube';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import Popup from '../Popup/Popup';

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
      <Button variant="contained" color="primary" onClick={props.clicked}>
        Start Game
      </Button>
      <Button variant="contained" color="primary" onClick={props.volumeToggle}>
        {volumeIcon}
      </Button>
      {props.isFull ? null : (
        <Button variant="contained" color="primary" onClick={props.musicToggle}>
          {musicIcon}
        </Button>
      )}

      {props.isFull ? null : (
        <Button variant="contained" color="primary" onClick={props.goFull}>
          Go Fullscreen
        </Button>
      )}
      {props.isFull ? null : <Popup />}
    </div>
  );
};

export default Controls;

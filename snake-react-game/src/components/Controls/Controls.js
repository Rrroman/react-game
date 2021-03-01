import React from 'react';
import classes from './Controls.module.css';
import Button from '@material-ui/core/Button';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import YouTubeIcon from '@material-ui/icons/YouTube';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import Popup from '../Popup/Popup';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';

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

  const fullScreenIcon = props.isFullScreen ? (
    <FullscreenExitIcon />
  ) : (
    <FullscreenIcon />
  );

  return (
    <div className={classes.controls__wrapper}>
      <div className={classes.controls__score}>Score: {props.score}</div>
      <Button variant="contained" color="primary" onClick={props.clicked}>
        Play
      </Button>
      <Button variant="contained" color="primary" onClick={props.volumeToggle}>
        {volumeIcon}
      </Button>
      {props.isFullScreen ? null : (
        <Button variant="contained" color="primary" onClick={props.musicToggle}>
          {musicIcon}
        </Button>
      )}

      <Button variant="contained" color="primary" onClick={props.goFullScreen}>
        {fullScreenIcon}
      </Button>

      {props.isFullScreen ? null : <Popup />}
    </div>
  );
};

export default Controls;

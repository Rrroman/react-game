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

const Controls = ({
  isVolume,
  isMusic,
  isFullScreen,
  volumeToggle,
  score,
  clicked,
  musicToggle,
  goFullScreen,
}) => {
  const volumeIcon = isVolume ? (
    <VolumeUpIcon className={classes.white}></VolumeUpIcon>
  ) : (
    <VolumeOffIcon className={classes.white}></VolumeOffIcon>
  );

  const musicIcon = isMusic ? (
    <SubscriptionsIcon className={classes.white}></SubscriptionsIcon>
  ) : (
    <YouTubeIcon className={classes.white}></YouTubeIcon>
  );

  const fullScreenIcon = isFullScreen ? (
    <FullscreenExitIcon />
  ) : (
    <FullscreenIcon />
  );

  const volumeButton = isFullScreen ? null : (
    <Button variant="contained" color="primary" onClick={volumeToggle}>
      {volumeIcon}
    </Button>
  );

  const musicButton = isFullScreen ? null : (
    <Button variant="contained" color="primary" onClick={musicToggle}>
      {musicIcon}
    </Button>
  );

  const settingsButton = isFullScreen ? null : (
    <Popup className={classes.popup} />
  );

  return (
    <div className={classes.controls__wrapper}>
      <div className={classes.controls__score}>Score: {score}</div>
      <Button variant="contained" color="primary" onClick={clicked}>
        Play
      </Button>
      {volumeButton}
      {musicButton}
      <Button variant="contained" color="primary" onClick={goFullScreen}>
        {fullScreenIcon}
      </Button>
      {settingsButton}
    </div>
  );
};

export default Controls;

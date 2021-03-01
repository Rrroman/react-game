import React from 'react';

const Context = React.createContext({
  bestScore: 0,
  audioVolumeHandler: () => {},
  audioVolume: 0,
  lastScores: 0,
  hardModeHandler: () => {},
  isHard: false,
  foodIconSwitchHandler: () => {},
  isBanana: false,
});

export default Context;

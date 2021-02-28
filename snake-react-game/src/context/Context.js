import React from 'react';

const Context = React.createContext({
  bestScore: 0,
  audioVolumeHandler: () => {},
  audioVolume: 0,
  lastScores: 0,
});

export default Context;

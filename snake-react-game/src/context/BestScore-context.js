import React from 'react';

const BestScoreContext = React.createContext({
  bestScore: 0,
  audioVolumeHandler: () => {},
  audioVolume: 0,
  lastScores: 0,
});

export default BestScoreContext;

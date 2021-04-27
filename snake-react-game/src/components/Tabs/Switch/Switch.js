import React, { useContext } from 'react';
import Switch from '@material-ui/core/Switch';
import Context from '../../../context/Context';

export default function Switches() {
  const switchContext = useContext(Context);

  return (
    <div>
      <Switch
        checked={switchContext.isHard}
        onChange={switchContext.hardModeHandler}
        color="primary"
        name="isHard"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
    </div>
  );
}

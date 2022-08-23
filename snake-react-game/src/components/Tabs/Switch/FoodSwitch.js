import React, { useContext } from 'react';
import Switch from '@material-ui/core/Switch';
import Context from '../../../context/Context';

export default function FoodSwitches() {
  const switchContext = useContext(Context);

  return (
    <div>
      <Switch
        checked={switchContext.isBanana}
        onChange={switchContext.foodIconSwitchHandler}
        color="primary"
        name="isBanana"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
    </div>
  );
}

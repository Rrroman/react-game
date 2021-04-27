import React, { useContext } from 'react';
import Switch from '@material-ui/core/Switch';
import Context from '../../../context/Context';

export default function FieldSwitches() {
  const switchContext = useContext(Context);

  return (
    <div>
      <Switch
        checked={switchContext.isFieldLarge}
        onChange={switchContext.fieldSwitchHandler}
        color="primary"
        name="isFieldLarge"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
    </div>
  );
}

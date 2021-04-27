import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Hotkeys from './Hotkeys/Hotkeys';
import Context from '../../context/Context';
import ContinuousSlider from './VolumeSlider/VolumeSlider';
import Switch from './Switch/Switch';
import FoodSwitch from './Switch/FoodSwitch';
import FieldSwitch from './Switch/FieldSizeSwitch';
import { List, ListItemText, Typography } from '@material-ui/core';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box div={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const scoreContext = useContext(Context);
  const reversedScores = scoreContext.lastScores.map((item) => item).reverse();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Settings" {...a11yProps(0)} />
          <Tab label="Score Statistic" {...a11yProps(1)} />
          <Tab label="Hot Keys" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div style={{ paddingTop: '20px' }}>
          <ContinuousSlider />
          <Typography style={{ marginBottom: 0, fontWeight: 'bold' }}>
            Game Settings:
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography>Normal</Typography>
            <Switch />
            <Typography>Hard</Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography>Apple</Typography>
            <FoodSwitch />
            <Typography>Banana</Typography>
          </div>
          <p style={{ marginBottom: 0, fontWeight: 'bold' }}>Field Size:</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography>Normal</Typography>
            <FieldSwitch />
            <Typography>Large</Typography>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography variant="h6" component="h2">
          Best Score: {scoreContext.bestScore}
        </Typography>
        <Typography variant="h6" component="h2">
          10 Last Scores:
        </Typography>
        <List>
          {reversedScores.map((score, index) => {
            return (
              <ListItemText key={index}>
                {index + 1}
                {')'} {score}
              </ListItemText>
            );
          })}
        </List>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Hotkeys />
      </TabPanel>
    </div>
  );
}

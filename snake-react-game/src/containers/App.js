import React, { Component } from 'react';
import classes from './App.module.css';
import Snake from '../components/Snake/Snake';

class App extends Component {
  state = {
    snakeCoordinates: [
      [10, 49],
      [12, 49],
      [14, 49],
    ],
  };

  render() {
    return (
      <div className={classes.app}>
        <div className={classes.app__field}>
          <Snake snakeCoordinates={this.state.snakeCoordinates} />
        </div>
      </div>
    );
  }
}

export default App;

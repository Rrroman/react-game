import React, { Component } from 'react';
import classes from './App.module.css';
import Snake from '../components/Snake/Snake';

class App extends Component {
  state = {
    direction: 'TOP',
    snakeStartPosition: [
      [49, 77],
      [49, 75],
      [49, 73],
    ],
  };

  componentDidMount() {
    window.addEventListener('keydown', this.keydownHandler.bind(this));
  }

  keydownHandler(event) {
    console.log(event.keyCode);
    switch (event.keyCode) {
      case 37:
        this.setState({ direction: 'LEFT' });
        break;
      case 38:
        this.setState({ direction: 'TOP' });
        break;
      case 39:
        this.setState({ direction: 'RIGHT' });
        break;
      case 40:
        this.setState({ direction: 'BOTTOM' });
        break;
      default:
        return;
    }
  }

  render() {
    return (
      <div className={classes.app}>
        <div className={classes.app__field}>
          <Snake snakeStartPosition={this.state.snakeStartPosition} />
        </div>
      </div>
    );
  }
}

export default App;

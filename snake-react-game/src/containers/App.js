import React, { Component } from 'react';
import classes from './App.module.css';
import Snake from '../components/Snake/Snake';

class App extends Component {
  state = {
    snakePosition: [
      [0, 0],
      [3, 0],
      [6, 0],
    ],
    direction: 'RIGHT',
    speed: 150,
  };

  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    window.addEventListener('keydown', this.keydownHandler.bind(this));
  }

  componentDidUpdate() {
    this.checkWallSmash();
  }

  keydownHandler(event) {
    console.log(event.keyCode);
    switch (event.keyCode) {
      case 37:
      case 65:
        this.setState({ direction: 'LEFT' });
        break;
      case 38:
      case 87:
        this.setState({ direction: 'TOP' });
        break;
      case 39:
      case 68:
        this.setState({ direction: 'RIGHT' });
        break;
      case 40:
      case 83:
        this.setState({ direction: 'BOTTOM' });
        break;
      default:
    }
  }

  moveSnake = () => {
    const snakeCoordinates = [...this.state.snakePosition];
    let headCoordinates = snakeCoordinates[snakeCoordinates.length - 1];
    console.log(headCoordinates);

    switch (this.state.direction) {
      case 'LEFT':
        headCoordinates = [headCoordinates[0] - 3, headCoordinates[1]];
        break;
      case 'TOP':
        headCoordinates = [headCoordinates[0], headCoordinates[1] - 3];
        break;
      case 'RIGHT':
        headCoordinates = [headCoordinates[0] + 3, headCoordinates[1]];
        break;
      case 'BOTTOM':
        headCoordinates = [headCoordinates[0], headCoordinates[1] + 3];
        break;
      default:
    }

    snakeCoordinates.push(headCoordinates);
    snakeCoordinates.shift();

    this.setState({
      snakePosition: snakeCoordinates,
    });
  };

  checkWallSmash = () => {
    const headCoordinates = this.state.snakePosition[
      this.state.snakePosition.length - 1
    ];

    if (
      headCoordinates[0] < 0 ||
      headCoordinates[0] >= 99 ||
      headCoordinates[1] < 0 ||
      headCoordinates[1] >= 99
    ) {
      this.gameOver();
    }
  };

  gameOver = () => {
    alert('Game Over');
    this.setState({
      snakePosition: [
        [0, 0],
        [0, 0],
        [0, 0],
      ],
      direction: 'RIGHT',
    });
  };

  render() {
    return (
      <div className={classes.app}>
        <div className={classes.app__field}>
          <Snake snakePosition={this.state.snakePosition} />
        </div>
      </div>
    );
  }
}

export default App;

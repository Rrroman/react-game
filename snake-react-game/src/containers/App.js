import React, { Component } from 'react';
import classes from './App.module.css';
import Snake from '../components/Snake/Snake';
import Fruit from '../components/Fruit/Fruit';
import constants from '../constants/constants';

class App extends Component {
  state = {
    snakePosition: [
      [0, 0],
      [0, 0],
      [0, 0],
    ],
    direction: constants.RIGHT,
    speed: constants.SPEED,
    fruitPosition:
      (Math.floor(Math.random() * constants.MAX_FRUIT_POSITION) /
        constants.SIZE) *
      constants.SIZE,
  };

  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    window.addEventListener('keydown', this.keydownHandler.bind(this));
  }

  componentDidUpdate() {
    this.checkWallSmash();
    this.checkSnakeBiteItSelf();
    console.log(this.state.fruitPosition);
  }

  spawnFruit = () => {
    return;
  };

  keydownHandler(event) {
    switch (event.keyCode) {
      case 37:
      case 65:
        if (this.state.direction !== constants.RIGHT) {
          this.setState({ direction: constants.LEFT });
        }
        break;
      case 38:
      case 87:
        if (this.state.direction !== constants.BOTTOM) {
          this.setState({ direction: constants.TOP });
        }
        break;
      case 39:
      case 68:
        if (this.state.direction !== constants.LEFT) {
          this.setState({ direction: constants.RIGHT });
        }
        break;
      case 40:
      case 83:
        if (this.state.direction !== constants.TOP) {
          this.setState({ direction: constants.BOTTOM });
        }
        break;
      default:
    }
  }

  moveSnake = () => {
    const snakeCoordinates = [...this.state.snakePosition];
    let headCoordinates = snakeCoordinates[snakeCoordinates.length - 1];

    switch (this.state.direction) {
      case constants.LEFT:
        headCoordinates = [
          headCoordinates[0] - constants.SPACE_BETWEEN_SNAKE_PIECES,
          headCoordinates[1],
        ];
        break;
      case constants.TOP:
        headCoordinates = [
          headCoordinates[0],
          headCoordinates[1] - constants.SPACE_BETWEEN_SNAKE_PIECES,
        ];
        break;
      case constants.RIGHT:
        headCoordinates = [
          headCoordinates[0] + constants.SPACE_BETWEEN_SNAKE_PIECES,
          headCoordinates[1],
        ];
        break;
      case constants.BOTTOM:
        headCoordinates = [
          headCoordinates[0],
          headCoordinates[1] + constants.SPACE_BETWEEN_SNAKE_PIECES,
        ];
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

  checkSnakeBiteItSelf = () => {
    const snakeCoordinates = [...this.state.snakePosition];

    const headCoordinates = snakeCoordinates[snakeCoordinates.length - 1];

    snakeCoordinates.pop();

    snakeCoordinates.forEach((snakePieces) => {
      if (
        headCoordinates[0] === snakePieces[0] &&
        headCoordinates[1] === snakePieces[1]
      ) {
        this.gameOver();
      }
    });
  };

  gameOver = () => {
    alert('Game Over');
    this.setState({
      snakePosition: [
        [0, 0],
        [3, 0],
        [6, 0],
      ],
      direction: constants.RIGHT,
    });
  };

  render() {
    return (
      <div className={classes.app}>
        <div className={classes.app__field}>
          <Snake snakePosition={this.state.snakePosition} />
          <Fruit fruitPosition={this.state.fruitPosition} />
        </div>
      </div>
    );
  }
}

export default App;

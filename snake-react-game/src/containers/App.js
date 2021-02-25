import React, { Component } from 'react';
import classes from './App.module.css';
import Snake from '../components/Snake/Snake';
import Fruit from '../components/Fruit/Fruit';
import constants from '../constants/constants';
import Controls from '../components/Controls/Controls';
import biteSound from '../assets/bite.mp3';

class App extends Component {
  state = {
    snakePosition: constants.STARTING_SNAKE_POSITION,
    direction: constants.RIGHT,
    speed: constants.SPEED,
    fruitPosition: constants.FRUIT_POSITION(),
    gameOver: false,
    gamePause: true,
    score: 0,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.keydownHandler.bind(this));
  }

  componentDidUpdate() {
    this.checkWallSmash();
    this.checkSnakeBiteItSelf();
    this.checkEatFruit();
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }

  keydownHandler(event) {
    switch (event.keyCode) {
      case 37:
      case 65:
        if (
          this.state.direction !== constants.RIGHT &&
          !this.state.gamePause &&
          !this.state.gameOver
        ) {
          this.setDirection(constants.LEFT);
          this.moveSnake();
        }
        break;
      case 38:
      case 87:
        if (
          this.state.direction !== constants.BOTTOM &&
          !this.state.gamePause &&
          !this.state.gameOver
        ) {
          this.setState({ direction: constants.TOP });
          this.moveSnake();
        }
        break;
      case 39:
      case 68:
        if (
          this.state.direction !== constants.LEFT &&
          !this.state.gamePause &&
          !this.state.gameOver
        ) {
          this.setState({ direction: constants.RIGHT });
          this.moveSnake();
        }
        break;
      case 40:
      case 83:
        if (
          this.state.direction !== constants.TOP &&
          !this.state.gamePause &&
          !this.state.gameOver
        ) {
          this.setState({ direction: constants.BOTTOM });
          this.moveSnake();
        }
        break;
      case 27:
        this.setState((prevState) => {
          return {
            gamePause: !prevState.gamePause,
          };
        });
        this.gamePauseToggle();
        break;
      default:
    }
  }

  setDirection(direction) {
    this.setState({ direction: direction });
  }

  moveSnake = () => {
    if (this.state.gameOver) {
      clearInterval(this.state.intervalId);
      const newIntervalId = setInterval(this.moveSnake, this.state.speed);

      this.setState({
        intervalId: newIntervalId,
        gameOver: false,
        speed: constants.SPEED,
      });
    }

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
      headCoordinates[0] >= constants.MAX_POSITION ||
      headCoordinates[1] < 0 ||
      headCoordinates[1] >= constants.MAX_POSITION
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

  checkEatFruit = () => {
    const headCoordinates = this.state.snakePosition[
      this.state.snakePosition.length - 1
    ];
    const fruitCoordinates = this.state.fruitPosition;

    if (
      headCoordinates[0] === fruitCoordinates[0] &&
      headCoordinates[1] === fruitCoordinates[1]
    ) {
      this.setState((prevState) => {
        if (prevState.speed > constants.SPEED_FAST) {
          return {
            fruitPosition: constants.FRUIT_POSITION(),
            speed: prevState.speed - constants.SPEED_STEP,
            score: this.state.snakePosition.length * constants.SPEED_STEP,
          };
        } else {
          return {
            fruitPosition: constants.FRUIT_POSITION(),
            speed: prevState.speed - 1,
            score: prevState.snakePosition.length * constants.SPEED_STEP,
          };
        }
      });

      clearInterval(this.state.intervalId);

      const intervalId = setInterval(this.moveSnake, this.state.speed);
      this.setState({ intervalId: intervalId });

      this.snakeGrow();

      const audio = new Audio(biteSound);
      audio.play();
    }
  };

  snakeGrow = () => {
    const snakeCoordinates = [...this.state.snakePosition];

    snakeCoordinates.unshift([]);

    this.setState({
      snakePosition: snakeCoordinates,
    });
  };

  gamePauseToggle = () => {
    if (this.state.gamePause) {
      clearInterval(this.state.intervalId);
      this.setState({
        gamePause: true,
      });
    } else if (!this.state.gamePause) {
      const newIntervalId = setInterval(this.moveSnake, this.state.speed);

      this.setState({
        intervalId: newIntervalId,
        gamePause: false,
      });
    }
  };

  gameOver = () => {
    this.setState({
      snakePosition: constants.STARTING_SNAKE_POSITION,
      direction: constants.RIGHT,
      speed: constants.SPEED,
      gameOver: true,
    });

    clearInterval(this.state.intervalId);
  };

  startGameHandler = () => {
    if (this.state.gameOver || this.state.gamePause) {
      const intervalId = setInterval(this.moveSnake, this.state.speed);
      this.setState({
        intervalId: intervalId,
        gameOver: false,
        gamePause: false,
        score: 0,
      });
    }
  };

  fieldStyles = {
    maxWidth: `${constants.FIELD_SIZE}`,
    height: `${constants.FIELD_SIZE}`,
  };

  render() {
    return (
      <div className={classes.app}>
        <Controls
          clicked={this.startGameHandler.bind(this)}
          score={this.state.score}
        />
        <div className={classes.app__field} style={this.fieldStyles}>
          <Snake
            snakePosition={this.state.snakePosition}
            direction={this.state.direction}
            gameOver={this.state.gameOver}
            size={constants.SIZE}
          />
          <Fruit
            fruitPosition={this.state.fruitPosition}
            size={constants.SIZE}
          />
        </div>
      </div>
    );
  }
}

export default App;

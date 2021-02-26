import React, { Component } from 'react';
import Fullscreen from 'react-full-screen';
import classes from './App.module.css';
import Snake from '../components/Snake/Snake';
import Fruit from '../components/Fruit/Fruit';
import constants from '../constants/constants';
import Controls from '../components/Controls/Controls';
import biteSound from '../assets/bite.mp3';
import MusicPlayer from '../components/MusicPlayer/MusicPlayer';
import Footer from '../components/Footer/Footer';
import BestScoreContext from '../context/BestScore-context';

class App extends Component {
  state = {
    snakePosition: constants.STARTING_SNAKE_POSITION,
    direction: constants.RIGHT,
    speed: constants.SPEED,
    fruitPosition: constants.FRUIT_POSITION(),
    isGameOver: false,
    isGamePause: true,
    score: 0,
    bestScore: 0,
    isVolume: true,
    isMusic: false,
    isFull: false,
  };

  goFull = () => {
    this.setState({ isFull: true });
  };

  audio = new Audio(biteSound);

  componentDidMount() {
    window.addEventListener('keydown', this.keydownHandler.bind(this));

    const isBestScore = localStorage.getItem('bestScore') > 0;
    const updateScore = isBestScore ? localStorage.getItem('bestScore') : 0;
    this.setState({
      bestScore: updateScore,
    });
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
          !this.state.isGamePause &&
          !this.state.isGameOver
        ) {
          this.setDirection(constants.LEFT);
          this.moveSnake();
        }
        break;
      case 38:
      case 87:
        if (
          this.state.direction !== constants.BOTTOM &&
          !this.state.isGamePause &&
          !this.state.isGameOver
        ) {
          this.setState({ direction: constants.TOP });
          this.moveSnake();
        }
        break;
      case 39:
      case 68:
        if (
          this.state.direction !== constants.LEFT &&
          !this.state.isGamePause &&
          !this.state.isGameOver
        ) {
          this.setState({ direction: constants.RIGHT });
          this.moveSnake();
        }
        break;
      case 40:
      case 83:
        if (
          this.state.direction !== constants.TOP &&
          !this.state.isGamePause &&
          !this.state.isGameOver
        ) {
          this.setState({ direction: constants.BOTTOM });
          this.moveSnake();
        }
        break;
      case 32:
        this.setState((prevState) => {
          return {
            isGamePause: !prevState.isGamePause,
          };
        });
        this.isGamePauseToggle();
        break;
      default:
    }
  }

  setDirection(direction) {
    this.setState({ direction: direction });
  }

  moveSnake = () => {
    if (this.state.isGameOver) {
      clearInterval(this.state.intervalId);
      const newIntervalId = setInterval(this.moveSnake, this.state.speed);

      this.setState({
        intervalId: newIntervalId,
        isGameOver: false,
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
      this.isGameOver();
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
        this.isGameOver();
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

      if (this.state.isVolume) {
        this.audio.currentTime = 0;
        this.audio.play();
      }
    }
  };

  snakeGrow = () => {
    const snakeCoordinates = [...this.state.snakePosition];

    snakeCoordinates.unshift([]);

    this.setState({
      snakePosition: snakeCoordinates,
    });
  };

  isGamePauseToggle = () => {
    if (this.state.isGamePause) {
      clearInterval(this.state.intervalId);
      this.setState({
        isGamePause: true,
      });
    } else if (!this.state.isGamePause) {
      const newIntervalId = setInterval(this.moveSnake, this.state.speed);

      this.setState({
        intervalId: newIntervalId,
        isGamePause: false,
      });
    }
  };

  isGameOver = () => {
    this.setState({
      snakePosition: constants.STARTING_SNAKE_POSITION,
      direction: constants.RIGHT,
      speed: constants.SPEED,
      isGameOver: true,
    });

    if (this.state.score > this.state.bestScore) {
      localStorage.setItem('bestScore', this.state.score);
      this.setState((prevState) => {
        return {
          bestScore: prevState.score,
        };
      });
    }

    clearInterval(this.state.intervalId);
  };

  startGameHandler = (event) => {
    if (this.state.isGameOver || this.state.isGamePause) {
      const intervalId = setInterval(this.moveSnake, this.state.speed);
      this.setState({
        intervalId: intervalId,
        isGameOver: false,
        isGamePause: false,
        score: 0,
      });
    }

    event.target.blur();
  };

  volumeToggleHandler = (event) => {
    this.setState((prevState) => {
      return {
        isVolume: !prevState.isVolume,
      };
    });

    event.target.blur();
  };

  musicToggleHandler = (event) => {
    this.setState((prevState) => {
      return {
        isMusic: !prevState.isMusic,
      };
    });

    event.target.blur();
  };

  render() {
    return (
      <div className={classes.app}>
        <Fullscreen
          enabled={this.state.isFull}
          onChange={(isFull) => this.setState({ isFull })}
        >
          <BestScoreContext.Provider
            value={{ bestScore: this.state.bestScore }}
          >
            <Controls
              clicked={this.startGameHandler.bind(this)}
              score={this.state.score}
              isVolume={this.state.isVolume}
              isMusic={this.state.isMusic}
              volumeToggle={this.volumeToggleHandler}
              musicToggle={this.musicToggleHandler}
              goFull={this.goFull.bind(this)}
              isFull={this.state.isFull}
            />
          </BestScoreContext.Provider>

          <div>
            <div className={classes.app__field}>
              <Snake
                snakePosition={this.state.snakePosition}
                direction={this.state.direction}
                isGameOver={this.state.isGameOver}
                size={constants.SIZE}
              />
              <Fruit
                fruitPosition={this.state.fruitPosition}
                size={constants.SIZE}
              />
            </div>
          </div>
        </Fullscreen>

        <MusicPlayer isMusic={this.state.isMusic} />

        <Footer />
      </div>
    );
  }
}

export default App;

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
import Context from '../context/Context';

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
    lastScores: [],
    isVolume: true,
    isMusic: false,
    isFullScreen: false,
    isHard: false,
    isBanana: false,
    audioVolume: 100,
  };

  audio = new Audio(biteSound);

  goFullScreen = (event) => {
    this.setState((prevState) => {
      return {
        isFullScreen: !prevState.isFullScreen,
      };
    });

    event.target.blur();
  };

  componentDidMount() {
    window.addEventListener('keydown', this.keydownHandler.bind(this));

    this.checkLocalStorage('bestScore');
    this.checkLocalStorage('audioVolume');
    this.checkLocalStorage('lastScores');
    this.checkLocalStorage('isHard');
    this.checkLocalStorage('isBanana');

    this.checkCurrentSpeed(JSON.parse(localStorage.getItem('isHard')));
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

  checkLocalStorage = (keyForCheck) => {
    const isKeyForCheck = localStorage.getItem(keyForCheck);
    const updateForKey = isKeyForCheck
      ? JSON.parse(localStorage.getItem(keyForCheck))
      : this.state[keyForCheck];

    this.setState({
      [keyForCheck]: updateForKey,
    });
  };

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
        this.audio.volume = this.state.audioVolume / 100;
        this.audio.play();
      }
    }
  };

  checkCurrentSpeed = (checker) => {
    let currentSpeed = null;
    if (checker) {
      currentSpeed = constants.SPEED / constants.HARD_MODE_DELIMITER;
    } else {
      currentSpeed = constants.SPEED;
    }

    this.setState({
      speed: currentSpeed,
    });
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
    const lastScoresCopy = [...this.state.lastScores];
    if (lastScoresCopy.length >= 10) {
      lastScoresCopy.push(this.state.score);
      lastScoresCopy.shift();
    } else {
      lastScoresCopy.push(this.state.score);
    }

    this.checkCurrentSpeed(this.state.isHard);

    this.setState({
      snakePosition: constants.STARTING_SNAKE_POSITION,
      direction: constants.RIGHT,
      isGameOver: true,
      lastScores: lastScoresCopy,
    });

    if (this.state.score > this.state.bestScore) {
      localStorage.setItem('bestScore', JSON.stringify(this.state.score));
      this.setState((prevState) => {
        return {
          bestScore: prevState.score,
        };
      });
    }

    localStorage.setItem('lastScores', JSON.stringify(lastScoresCopy));
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

  audioVolumeHandler = (newVolume) => {
    this.setState({
      audioVolume: newVolume,
    });

    localStorage.setItem('audioVolume', JSON.stringify(this.state.audioVolume));
  };

  musicToggleHandler = (event) => {
    this.setState((prevState) => {
      return {
        isMusic: !prevState.isMusic,
      };
    });

    event.target.blur();
  };

  hardModeHandler = (event) => {
    this.setState({ isHard: event.target.checked });

    if (event.target.checked) {
      this.setState({
        speed: constants.SPEED / constants.HARD_MODE_DELIMITER,
      });
      localStorage.setItem('isHard', JSON.stringify(event.target.checked));
    } else {
      this.setState({
        speed: constants.SPEED,
      });
      localStorage.setItem('isHard', JSON.stringify(event.target.checked));
    }
  };

  foodIconSwitchHandler = (event) => {
    this.setState({ isBanana: event.target.checked });

    if (event.target.checked) {
      this.setState({
        isBanana: true,
      });
      localStorage.setItem('isBanana', JSON.stringify(event.target.checked));
    } else {
      this.setState({
        isBanana: false,
      });
      localStorage.setItem('isBanana', JSON.stringify(event.target.checked));
    }
  };

  render() {
    return (
      <div className={classes.app}>
        <Fullscreen
          enabled={this.state.isFullScreen}
          onChange={(isFullScreen) => this.setState({ isFullScreen })}
        >
          <Context.Provider
            value={{
              bestScore: this.state.bestScore,
              audioVolumeHandler: this.audioVolumeHandler,
              audioVolume: this.state.audioVolume,
              lastScores: this.state.lastScores,
              hardModeHandler: this.hardModeHandler,
              isHard: this.state.isHard,
              foodIconSwitchHandler: this.foodIconSwitchHandler,
              isBanana: this.state.isBanana,
            }}
          >
            <Controls
              clicked={this.startGameHandler.bind(this)}
              score={this.state.score}
              isVolume={this.state.isVolume}
              isMusic={this.state.isMusic}
              volumeToggle={this.volumeToggleHandler}
              musicToggle={this.musicToggleHandler}
              goFullScreen={this.goFullScreen.bind(this)}
              isFullScreen={this.state.isFullScreen}
            />
          </Context.Provider>

          <div>
            <div
              className={`${classes.app__field} ${
                this.state.isFullScreen ? classes.app__fullScreen : null
              }`}
            >
              <Snake
                snakePosition={this.state.snakePosition}
                direction={this.state.direction}
                isGameOver={this.state.isGameOver}
                size={constants.SIZE}
              />
              <Fruit
                fruitPosition={this.state.fruitPosition}
                size={constants.SIZE}
                isBanana={this.state.isBanana}
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

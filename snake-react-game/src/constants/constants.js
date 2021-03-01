const constants = {
  SIZE: 4,
  SPEED: 150,
  HARD_MODE_DELIMITER: 3,
  SPEED_FAST: 50,
  SPEED_STEP: 10,
  MAX_POSITION: 98,
  MIN_POSITION: 1,
  TOP: 'TOP',
  RIGHT: 'RIGHT',
  LEFT: 'LEFT',
  BOTTOM: 'BOTTOM',
  SPACE_BETWEEN_SNAKE_PIECES: 2,
  STARTING_SNAKE_POSITION: [
    [0, 0],
    [2, 0],
    [4, 0],
  ],
  FRUIT_POSITION: () => [
    Math.floor(
      (Math.random() * constants.MAX_POSITION + constants.MIN_POSITION) /
        constants.SIZE,
    ) * constants.SIZE,
    Math.floor(
      (Math.random() * constants.MAX_POSITION + constants.MIN_POSITION) /
        constants.SIZE,
    ) * constants.SIZE,
  ],
};

export default constants;

const constants = {
  SIZE: 4,
  SPEED: 150,
  MAX_POSITION: 96,
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

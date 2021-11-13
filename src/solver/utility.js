export const getXYCoord = (pos, boardSize) => {
  return [pos % boardSize, Math.floor(pos / boardSize)];
};

export const getMoveChoices = (pos, boardSize) => {
  let moveChoices = [];
  let [xPos, yPos] = getXYCoord(pos, boardSize);
  if (xPos !== 0) {
    moveChoices.push("left");
  }
  if (xPos !== boardSize - 1) {
    moveChoices.push("right");
  }
  if (yPos !== 0) {
    moveChoices.push("top");
  }
  if (yPos !== boardSize - 1) {
    moveChoices.push("bottom");
  }
  return moveChoices;
};

export const selectNeighbour = (pos, choice, boardSize) => {
  switch (choice) {
    case "left":
      return pos - 1;
    case "right":
      return pos + 1;
    case "top":
      return pos - boardSize;
    case "bottom":
      return pos + boardSize;
    default:
      return pos;
  }
};

export const swapElement = (tiles, a, b) => {
  let newTiles = [...tiles];
  let temp = newTiles[a];
  newTiles[a] = newTiles[b];
  newTiles[b] = temp;
  return newTiles;
};

export const moveReverse = (move) => {
  if (move === "left") {
    return "right";
  }
  if (move === "right") {
    return "left";
  }
  if (move === "top") {
    return "bottom";
  }
  if (move === "bottom") {
    return "top";
  }
  return move;
};

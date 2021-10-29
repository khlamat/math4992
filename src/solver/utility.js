import _ from "lodash";

export const getXYCoord = (pos) => {
  return [pos % 4, Math.floor(pos / 4)];
};

export const getMoveChoices = (pos) => {
  let moveChoices = [];
  let [xPos, yPos] = getXYCoord(pos);
  if (xPos !== 0) {
    moveChoices.push("left");
  }
  if (xPos !== 3) {
    moveChoices.push("right");
  }
  if (yPos !== 0) {
    moveChoices.push("top");
  }
  if (yPos !== 3) {
    moveChoices.push("bottom");
  }
  return moveChoices;
};

export const selectNeighbour = (pos, choice) => {
  switch (choice) {
    case "left":
      return pos - 1;
    case "right":
      return pos + 1;
    case "top":
      return pos - 4;
    case "bottom":
      return pos + 4;
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

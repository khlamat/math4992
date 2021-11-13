import _ from "lodash";
import { getMoveChoices, getXYCoord, selectNeighbour } from "./utility";

export const manhattanDist = (tiles) => {
  let boardSize = Math.sqrt(tiles.length);
  let dist = 0;
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i] === tiles.length - 1) {
      continue;
    }
    const [targetXpos, targetYpos] = getXYCoord(tiles[i], boardSize)
    const [currentXpos, currentYpos] = getXYCoord(i, boardSize);
    const t_dist = Math.abs(currentXpos - targetXpos) + Math.abs(currentYpos - targetYpos);
    dist += t_dist;
  }
  return dist;
};

const linearCorrection = (tiles) => {
  let boardSize = Math.sqrt(tiles.length);
  let noOfConflict = 0;
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i] === tiles.length - 1) {
      continue;
    }
    if (tiles[i] !== i) {
      const [targetXpos, targetYpos] = getXYCoord(tiles[i], boardSize);
      const [currentXpos, currentYpos] = getXYCoord(i, boardSize);
      if (targetXpos === currentXpos) {
        for(let j = currentYpos + 1; j < boardSize; j++){
          let pos = currentXpos + j * boardSize;
          const [destX, destY] = getXYCoord(tiles[pos], boardSize);
          if (destX === currentXpos && destY < targetYpos) {
            noOfConflict++;
            break;
          }
        }
      } else if (targetYpos === currentYpos) {
        for(let j = currentXpos + 1; j < boardSize; j++){
          let pos = j + currentYpos * boardSize;
          const [destX, destY] = getXYCoord(tiles[pos], boardSize);
          if (destY === currentYpos && destX < targetXpos) {
            noOfConflict++;
            break;
          }
        }
      }
    }
  }
  return 2 * noOfConflict;
};

export const linearConflict = (tiles) => {
  return manhattanDist(tiles) + linearCorrection(tiles);
};

const closureCorrection = (tiles) => {
  let boardSize = Math.sqrt(tiles.length);
  let correction = 0;
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i] === tiles.length - 1 || tiles[i] === i) {
      continue;
    }
    let moveChoices = getMoveChoices(i, boardSize);
    let neigLength = moveChoices.length;
    let noOfCorrect = 0;
    _.forEach(moveChoices, (choice) => {
      let neigPos = selectNeighbour(i, choice, boardSize);
      if (tiles[neigPos] === neigPos) {
        noOfCorrect++;
      }
    });
    if(noOfCorrect === neigLength - 1){
      correction += 1;
    }
    if (noOfCorrect === neigLength) {
      correction += 2;
    }
  }
  return correction;
};

export const closureConflict = (tiles) => {
  return manhattanDist(tiles) + closureCorrection(tiles);
};

export const mixConflict = (tiles) => {
  return manhattanDist(tiles) + Math.max(closureCorrection(tiles), linearCorrection(tiles));
};

export const combineConflict = (tiles) => {
  let boardSize = Math.sqrt(tiles.length);
  let correction = 0;
  let noOfConflict = 0;
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i] === tiles.length - 1 ) {
      continue;
    }
    if(tiles[i] !== i) {
      let moveChoices = getMoveChoices(i, boardSize);
      let neigLength = moveChoices.length;
      let noOfCorrect = 0;
      _.forEach(moveChoices, (choice) => {
        let neigPos = selectNeighbour(i, choice, boardSize);
        if (tiles[neigPos] === neigPos) {
          noOfCorrect++;
        }
      });
      if (noOfCorrect === neigLength - 1) {
        correction += 1;
      }

      if (noOfCorrect === neigLength) {
        correction += 2;
      }

      const [targetXpos, targetYpos] = getXYCoord(tiles[i], boardSize);
      const [currentXpos, currentYpos] = getXYCoord(i, boardSize);
      if (targetXpos === currentXpos) {
        for(let j = currentYpos + 1; j < boardSize; j++){
          let pos = currentXpos + j * boardSize;
          if (pos === tiles[pos]) continue;
          const [destX, destY] = getXYCoord(tiles[pos], boardSize);
          if (destX === currentXpos && destY < targetYpos) {
            noOfConflict++;
          }
        }
      } else if (targetYpos === currentYpos) {
        for(let j = currentXpos + 1; j < boardSize; j++){
          let pos = j + currentYpos * boardSize;
          if (pos === tiles[pos]) continue;
          const [destX, destY] = getXYCoord(tiles[pos], boardSize);
          if (destY === currentYpos && destX < targetXpos) {
            noOfConflict++;
          }
        }
      }
    }
  }
  return correction + 2 * (noOfConflict) +  manhattanDist(tiles);
}



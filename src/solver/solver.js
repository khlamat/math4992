import aStarAlgorithm from "./aStarAlgorithm.js";
import { linearConflict, manhattanDist, closureConflict, maxConflict, mergeConflict } from "./heuristics.js";

const solver = (tiles, heuristic) => {
  switch(heuristic) {
    case 'manHattan':
      return aStarAlgorithm(tiles, manhattanDist);
    case 'linearConflict':
      return aStarAlgorithm(tiles, linearConflict);
    case 'closureConflict':
      return aStarAlgorithm(tiles, closureConflict);
    case 'maxConflict':
      return aStarAlgorithm(tiles, maxConflict);
    case 'mergeConflict':
      return aStarAlgorithm(tiles, mergeConflict);
    default:
      return aStarAlgorithm(tiles, manhattanDist);
  }
};

export default solver;
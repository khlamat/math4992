import aStarAlgorithm from "./aStarAlgorithm";
import { linearConflict, manhattanDist, closureConflict, mixConflict, combineConflict } from "./heuristics";

const solver = (tiles, heuristic) => {
  switch(heuristic) {
    case 'manHattan':
      return aStarAlgorithm(tiles, manhattanDist);
    case 'linearConflict':
      return aStarAlgorithm(tiles, linearConflict);
    case 'closureConflict':
      return aStarAlgorithm(tiles, closureConflict);
    case 'mixConflict':
      return aStarAlgorithm(tiles, mixConflict);
    case 'combineConflict':
      return aStarAlgorithm(tiles, combineConflict);
    default:
      return aStarAlgorithm(tiles, manhattanDist);
  }
};

export default solver;
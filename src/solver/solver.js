import aStarAlgorithm from "./aStarAlgorithm";
import { manhattanDist } from "./heuristics";

const solver = (tiles, heuristic) => {
  console.log(tiles,heuristic)
  if (heuristic === "manHattan") {
    return aStarAlgorithm(tiles, manhattanDist);
    return;
  }
};

export default solver;
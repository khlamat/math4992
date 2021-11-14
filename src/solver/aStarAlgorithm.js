import {
  getMoveChoices,
  selectNeighbour,
  swapElement,
  moveReverse,
} from "./utility.js";
import PriorityQueue from "js-priority-queue";
import _ from "lodash";

const aStarAlgorithm = (tiles, heuristic) => {
  const initialState = createState(tiles, heuristic, 0);
  const stateTree = {
    state: initialState,
    children: [],
    parent: null,
  };
  const allNeighbourState = getAllNeighbourState(initialState, heuristic);
  stateTree.children = _.map(allNeighbourState, (state) => {
    return {
      state,
      children: [],
      parent: stateTree,
    };
  });
  let stateQueue = new PriorityQueue({
    initialValues: [stateTree, ...stateTree.children],
    comparator: (a, b) =>
      a.state.noOfMoves +
      a.state.heuristicDist -
      (b.state.noOfMoves + b.state.heuristicDist),
  });
  let count = 0;
  while (stateQueue.length) {
    if (count > 5000000) {
      console.log("Over 5000000 iteration, stop the algorithm");
      return {
        solution: [],
        noOfIteration: Infinity,
        pathLength: 0,
      };
    }
    count++;
    let lowest = stateQueue.dequeue();
    if (lowest.state.heuristicDist === 0) {
      console.log(`Number of Iteration: ${count}`);
      let treeIterator = lowest;
      let reversePath = [];
      while (treeIterator.parent) {
        reversePath.push(treeIterator.state.preDirection);
        treeIterator = treeIterator.parent;
      }
      let solution = _.reverse(reversePath);
      return {solution, noOfIteration: count, pathLength: solution.length,};
    } else {
      let newMoveStates = getAllNeighbourState(lowest.state, heuristic);
      lowest.children = _.map(newMoveStates, (state) => {
        return {
          state,
          children: [],
          parent: lowest,
        };
      });
      _.forEach(lowest.children, (node) => stateQueue.queue(node));
    }
  }
};

const createState = (tiles, heuristic, noOfMoves, preDirection = null) => {
  return {
    tiles,
    heuristicDist: heuristic(tiles),
    noOfMoves,
    preDirection,
  };
};

const getAllNeighbourState = (state, heuristic) => {
  const { tiles, noOfMoves, preDirection } = state;
  let boardSize = Math.sqrt(tiles.length);
  let emptyPos = 0;
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i] === tiles.length - 1) {
      emptyPos = i;
      break;
    }
  }
  let duplicatedMove = moveReverse(preDirection);
  let moveChoices = _.filter(
    getMoveChoices(emptyPos, boardSize),
    (move) => move !== duplicatedMove
  );
  return _.map(moveChoices, (direction) => {
    const newPos = selectNeighbour(emptyPos, direction, boardSize);
    const newTiles = swapElement(tiles, emptyPos, newPos);
    return createState(newTiles, heuristic, noOfMoves + 1, direction);
  });
};

export default aStarAlgorithm;

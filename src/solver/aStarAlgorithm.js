import {
  getXYCoord,
  getMoveChoices,
  selectNeighbour,
  swapElement,
  moveReverse,
} from "./utility";
import { manhattanDist } from "./heuristics";
import PriorityQueue from "js-priority-queue";
import _ from "lodash";
import { queryHelpers } from "@testing-library/dom";

const aStarAlgorithm = (tiles, heuristic) => {
  const initialState = createState(tiles, heuristic, 0);
  const stateTree = {
    state: initialState,
    children: [],
    parent: null
  };
  const allNeighbour = getAllNeighbour(initialState, heuristic);
  stateTree.children = _.map(allNeighbour, (state) => {
    return {
      state,
      children: [],
      parent: stateTree
    };
  });

  //   heuristic(tiles);
  let stateQueue = new PriorityQueue({
    initialValues: stateTree.children,
    comparator: (a, b) =>
      a.state.noOfMoves +
      a.state.heuristicDist -
      (b.state.noOfMoves + b.state.heuristicDist),
  });
  let count = 0;
  while (stateQueue.length) {
    count++;
    let lowest = stateQueue.dequeue();
    if (lowest.state.heuristicDist === 0) {
      console.log(count)
      return lowest;
    } else {
      let newMoveStates = getAllNeighbour(lowest.state, heuristic);
      lowest.children = _.map(newMoveStates, (state) => {
        return {
          state,
          children: [],
          parent: lowest
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

const getAllNeighbour = (state, heuristic) => {
  const { tiles, noOfMoves, preDirection } = state;
  let emptyPos = 0;
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i] === 15) {
      emptyPos = i;
    }
  }
  let duplicatedMove = moveReverse(preDirection);
  let moveChoices = _.filter(
    getMoveChoices(emptyPos),
    (move) => move !== duplicatedMove
  );

  return _.map(moveChoices, (direction) => {
    const newPos = selectNeighbour(emptyPos, direction);
    const newTiles = swapElement(tiles, emptyPos, newPos);
    return createState(newTiles, heuristic, noOfMoves + 1, direction);
  });
};

export default aStarAlgorithm;

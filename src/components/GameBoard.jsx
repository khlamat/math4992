import React, { useState, useEffect } from "react";
import Boards from "./Boards";
import Heuristics from "./Heuristics";
import {
  getMoveChoices,
  getXYCoord,
  selectNeighbour,
  swapElement,
} from "../solver/utility";
import solver from "../solver/solver";
import _ from "lodash";
import { Button, Row, Col } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";

const GameBoard = () => {
  const [heuristic, setHeuristic] = useState("manHattan");
  const [tiles, setTiles] = useState([]);
  const [initialState, setInitialState] = useState(false);
  useEffect(() => {
    generateInitialTiles(4, 40);
  }, []);

  const generateInitialTiles = (boardLength, noOfmoves) => {
    let initialTiles = _.range(boardLength * boardLength);
    let emptyPos = 15;
    for (let i = 0; i < noOfmoves; i++) {
      let moveChoices = getMoveChoices(emptyPos);
      let choice = moveChoices[Math.floor(Math.random() * moveChoices.length)];
      const newEmptyPos = selectNeighbour(emptyPos, choice);
      let temp = initialTiles[emptyPos];
      initialTiles[emptyPos] = initialTiles[newEmptyPos];
      initialTiles[newEmptyPos] = temp;
      emptyPos = newEmptyPos;
    }
    console.log(initialTiles)
    setInitialState(initialTiles);
    setTiles(initialTiles);
  };

  const solveGame = () => {
    let result = solver(tiles, heuristic);
    let treeIterator = result;
    let reversePath = [];
    console.log(treeIterator);
    while (treeIterator.parent) {
      reversePath.push(treeIterator.state.preDirection);
      treeIterator = treeIterator.parent;
    }
    console.log(reversePath);
    let emptyPos = 0;
    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i] === 15) {
        emptyPos = i;
      }
    }
    let newTiles = [...tiles];
    let index = reversePath.length - 1;
    let animation = setInterval(() => {
      if(index >= 0){
        let newEmptyPos = selectNeighbour(emptyPos, reversePath[index]);
        newTiles = swapElement(newTiles, emptyPos, newEmptyPos);
        emptyPos = newEmptyPos;
        index--;
        setTiles(newTiles);
      }
      else {
        clearInterval(animation)
      }
    }, 300)
  };

  return (
    <div style={styles.GameBoardStyle}>
      <Row justify="start" gutter={[16, 16]}>
        <Boards
          initialState={initialState}
          tiles={tiles}
          setTiles={setTiles}
        />
        <Col span={24}>
          <Button
            onClick={() => {
              generateInitialTiles(4, 300);
            }}
          >
            Reset the game
          </Button>
        </Col>
        <Col span={24}>
          <Heuristics
            heuristic={heuristic}
            setHeuristic={setHeuristic}
          ></Heuristics>
        </Col>
        <Col span={24}>
          <Button icon={<PlayCircleOutlined />} onClick={solveGame}>
            Start
          </Button>
        </Col>
      </Row>
    </div>
  );
};

const styles = {
  GameBoardStyle: {
    margin: "0 20px",
  },
};
export default GameBoard;

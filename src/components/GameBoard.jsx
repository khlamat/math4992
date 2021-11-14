import React, { useState, useEffect } from "react";
import Boards from "./Boards";
import Heuristics from "./Heuristics";
import {
  getMoveChoices,
  selectNeighbour,
  swapElement,
} from "../solver/utility";
import solver from "../solver/solver";
import _ from "lodash";
import { Button, Row, Col, InputNumber } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";

const GameBoard = () => {
  const [boardSize, setBoardSize] = useState(4);
  const [heuristic, setHeuristic] = useState("manHattan");
  const [tiles, setTiles] = useState([]);
  const [initialState, setInitialState] = useState(false);
  useEffect(() => {
    if (boardSize) {
      generateInitialTiles();
    }
  }, [boardSize]);

  const generateInitialTiles = () => {
    let noOfmoves = 200;
    let initialTiles = _.range(boardSize * boardSize);
    let emptyPos = initialTiles.length - 1;
    for (let i = 0; i < noOfmoves; i++) {
      let moveChoices = getMoveChoices(emptyPos, boardSize);
      let choice = moveChoices[Math.floor(Math.random() * moveChoices.length)];
      const newEmptyPos = selectNeighbour(emptyPos, choice, boardSize);
      let temp = initialTiles[emptyPos];
      initialTiles[emptyPos] = initialTiles[newEmptyPos];
      initialTiles[newEmptyPos] = temp;
      emptyPos = newEmptyPos;
    }
    // initialTiles=[3, 12, 0, 6, 5, 1, 14, 7, 15, 2, 8, 10, 4, 9, 13, 11]
    // initialTiles=[4, 7, 11, 2, 1, 3, 5, 10, 8, 0, 14, 9, 6, 15, 13, 12]
    // initialTiles=[1, 10, 3, 5, 13, 0, 9, 15, 12, 2, 4, 11, 6, 8, 14, 7]
    // initialTiles=[0, 6, 1, 7, 5, 3, 11, 2, 12, 9, 15, 14, 4, 8, 13, 10]
    setInitialState(initialTiles);
    setTiles(initialTiles);
  };

  const solveGame = () => {
    let { solution } = solver(tiles, heuristic);
    console.log(`Solution:`, solution);
    let emptyPos = 0;
    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i] === boardSize * boardSize - 1) {
        emptyPos = i;
      }
    }
    let newTiles = [...tiles];
    let index = 0;
    let animation = setInterval(() => {
      if (index < solution.length) {
        let newEmptyPos = selectNeighbour(emptyPos, solution[index], boardSize);
        newTiles = swapElement(newTiles, emptyPos, newEmptyPos);
        emptyPos = newEmptyPos;
        index++;
        setTiles(newTiles);
      } else {
        clearInterval(animation);
      }
    }, 100);
  };

  return (
    <Row>
      <Col style={styles.controlPanel} md={6} xs={24}>
        <Row justify="start" gutter={[16, 16]}>
          <Col span={24}>
            <Row>Board Size:</Row>
            <Row>
              <InputNumber
                min={3}
                max={10}
                value={boardSize}
                onChange={(value) => {
                  setBoardSize(Math.floor(value));
                }}
              />
            </Row>
          </Col>
          <Col span={24}>
            <Heuristics
              heuristic={heuristic}
              setHeuristic={setHeuristic}
            ></Heuristics>
          </Col>
          <Col span={24}>
            <Button
              style={{ margin: "0 10px 10px 0" }}
              onClick={() => {
                setTiles(initialState);
              }}
            >
              Reset the game
            </Button>
            <Button
              onClick={() => {
                generateInitialTiles(100);
              }}
            >
              New game
            </Button>
          </Col>
          <Col span={24}>
            <Button
              style={{ marginBottom: "10px" }}
              icon={<PlayCircleOutlined />}
              onClick={solveGame}
            >
              Start
            </Button>
          </Col>
        </Row>
      </Col>
      <Col span={16} style={{ backgroundColor: "" }}>
        <Row justify="start" gutter={[16, 16]}>
          <Col span={24} style={styles.GameBoardStyle}>
            <Boards
              initialState={initialState}
              tiles={tiles}
              setTiles={setTiles}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const styles = {
  GameBoardStyle: {
    // margin: "0 20px",
    // backgroundColor: 'rgb(153,51,255)'
  },
  controlPanel: {
    marginLeft: "10px",
    // backgroundColor: '#e98074',
    // borderStyle: 'solid',
    // borderWidth: '1px'
  },
};
export default GameBoard;

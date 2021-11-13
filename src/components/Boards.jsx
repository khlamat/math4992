import React from "react";
import { Col } from "antd";
import _ from "lodash";
import Tile from "./Tile.jsx";
import { getMoveChoices, getXYCoord, selectNeighbour, swapElement } from "../solver/utility.js";
import { useEffect } from "react/cjs/react.development";

const Boards = ({ initialState, tiles, setTiles }) => {
  const squareLength = 80;
  useEffect(() => {
    let boardSize = Math.sqrt(tiles.length);
    _.forEach((val, pos) => {
      let [xPos, yPos] = getXYCoord(pos, boardSize);
      let left = `${xPos  * squareLength}px`;
      let top = `${yPos  * squareLength}px`;
      let element = document.getElementById(val);
      element.style.left = left;
      element.style.top = top;
    })
  }, [tiles])
  return (
    <Col
      onClick={(e) => {
        let targetValue = parseInt(e.target.getAttribute("val"));
        if (Number.isInteger(targetValue)) {
          let boardSize = Math.sqrt(tiles.length);
          let emptyPos = 0;
          let targetPos = 0;
          for (let i = 0; i < tiles.length; i++) {
            if (tiles[i] === tiles.length - 1) {
              emptyPos = i;
            }
            if (tiles[i] === targetValue) {
              targetPos = i;
            }
          }
          let moveChoices = getMoveChoices(emptyPos, boardSize);
          let move = _.find(moveChoices, move => targetPos === selectNeighbour(emptyPos, move, boardSize)
          );
          if (move) {
            setTiles(swapElement(tiles, emptyPos, targetPos));
          }
        }
      }}
      style={{...style.boardStyle, width: `${Math.sqrt(tiles.length) * 80}px`, height: `${Math.sqrt(tiles.length) * 80}px`}}
    >
      {_.map(initialState, (value) => {
        let pos = _.findIndex(tiles, (ele) => ele === value)
        return <Tile boardSize={Math.sqrt(tiles.length)} key={value} value={value} pos={pos} />;
      })}
    </Col>
  );
};

const style = {
  boardStyle: {
    position: "relative",
    backgroundColor: "gray",
    margin: 'auto'
  },
  rowStyle: {
    position: "relative",
  },
};
export default Boards;
